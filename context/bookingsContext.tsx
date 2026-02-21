"use client";
import { handleError } from "@/utils/helper";
import {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import VideoCall from "@/components/main/video/videoCall";
import { BookingType } from "@/types/bookings";
import { startVideoCallAction } from "@/libs/actions/bookings.actions";

type RemoteUserTracks = {
  uid: number;
  cameraTrack?: IAgoraRTCRemoteUser["videoTrack"];
  screenTrack?: IAgoraRTCRemoteUser["videoTrack"];
};

// Define the type for context
type BookingsContextType = {
  leave: () => void;
  join: (appointmentData: BookingType) => void;
  loading: Record<string, boolean>;
  joined: boolean;
  localVideoTrack: ILocalVideoTrack | null;
  localAudioTrack: IMicrophoneAudioTrack | null;
  toggleCamera: () => void;
  toggleMIC: () => void;
  camOn: boolean;
  micOn: boolean;
  screenShare: boolean;
  expiresAt: string;
  stopScreenShare: () => void;
  startScreenShare: () => void;
  remoteUsers: Record<
    number,
    {
      uid: number;
      cameraTrack?: IAgoraRTCRemoteUser["videoTrack"];
      screenTrack?: IAgoraRTCRemoteUser["videoTrack"];
    }
  >;
};

const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined,
);

export const BookingsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [remoteUsers, setRemoteUsers] = useState<
    Record<number, RemoteUserTracks>
  >({});
  const [{ micOn, camOn, screenShare, expiresAt }, setToggleMedia] = useState<{
    micOn: boolean;
    camOn: boolean;
    screenShare: boolean;
    expiresAt: string;
  }>({
    micOn: false,
    camOn: false,
    screenShare: false,
    expiresAt: "",
  });
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [appointment, setAppointment] = useState<BookingType>(
    {} as BookingType,
  );
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  const [joined, setJoined] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<ILocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<IMicrophoneAudioTrack | null>(null);

  async function join(appointmentData: BookingType) {
    if (!appointmentData) return;
    setAppointment(appointmentData);

    const bookingId = appointmentData?._id;
    const menteeId = appointmentData?.mentorId?._id;
    setLoading({ [appointmentData?._id]: true });
    const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

    const rsp = await startVideoCallAction(bookingId, menteeId);

    if (rsp?.error && !rsp?.data) {
      handleError(rsp?.message);
      setLoading({ [appointmentData?._id]: false });
      return;
    }

    if (!rsp?.error && rsp?.data) {
      setLoading({ [appointmentData?._id]: false });
      setToggleMedia((prev) => ({
        ...prev,
        expiresAt: rsp?.data?.expiresAt,
      }));

      const { channel, token, uid } = rsp?.data;

      // 2️⃣ Create Agora client
      const client = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });
      clientRef.current = client;

      // 3️⃣ Join channel
      await client.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID!,
        channel,
        token,
        uid,
      );

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "audio") {
          user.audioTrack?.play();
          return;
        }

        if (mediaType === "video") {
          const track = user.videoTrack!;
          const label = track.getMediaStreamTrack().label.toLowerCase();
          const isScreen = label.includes("screen");

          setRemoteUsers((prev) => ({
            ...prev,
            [user.uid]: {
              uid: user.uid,
              ...(isScreen ? { screenTrack: track } : { cameraTrack: track }),
            },
          }));
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        setRemoteUsers((prev) => {
          const existing = prev[Number(user.uid)];
          if (!existing) return prev;

          if (mediaType === "video") {
            return {
              ...prev,
              [user.uid]: {
                ...existing,
                screenTrack: undefined,
                cameraTrack: undefined,
              },
            };
          }

          return prev;
        });
      });

      client.on("user-left", (user) => {
        setRemoteUsers((prev) => {
          const updated = { ...prev };
          delete updated[Number(user.uid)];
          return updated;
        });
      });

      // 4️⃣ Create tracks
      const [mic, cam] = await AgoraRTC.createMicrophoneAndCameraTracks();

      setLocalAudioTrack(mic);
      setLocalVideoTrack(cam);

      // 5️⃣ Publish tracks
      await client.publish([mic, cam]);
      setJoined(true);
    }
  }

  async function leave() {
    localAudioTrack?.stop();
    localVideoTrack?.stop();
    localAudioTrack?.close();
    localVideoTrack?.close();

    await clientRef.current?.leave();
    clientRef.current = null;
    setJoined(false);
  }

  const toggleMIC = async () => {
    if (!localAudioTrack) return;

    await localAudioTrack.setEnabled(!micOn);
    setToggleMedia((prev) => ({ ...prev, ["micOn"]: !prev["micOn"] }));
  };

  const toggleCamera = async () => {
    if (!localVideoTrack) return;
    await localVideoTrack.setEnabled(!camOn);
    setToggleMedia((prev) => ({ ...prev, ["camOn"]: !prev["camOn"] }));
  };

  // 🖥 Start screen share
  const startScreenShare = async () => {
    if (!clientRef.current || screenShare) return;

    const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

    const screenTrack = await AgoraRTC.createScreenVideoTrack(
      {
        encoderConfig: "1080p_1",
      },
      "disable",
    );

    // unpublish camera
    if (localVideoTrack) {
      await clientRef.current.unpublish(localVideoTrack);
      localVideoTrack.stop();
    }

    await clientRef.current.publish(screenTrack);

    setLocalVideoTrack(screenTrack);
    setToggleMedia((prev) => ({
      ...prev,
      ["screenShare"]: !prev["screenShare"],
    }));

    // auto stop when user ends screen share
    screenTrack.on("track-ended", stopScreenShare);
  };

  // 🖥 Stop screen share
  const stopScreenShare = async () => {
    if (!clientRef.current || !screenShare) return;

    const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

    const cam = await AgoraRTC.createCameraVideoTrack();

    await clientRef.current.unpublish(localVideoTrack!);
    localVideoTrack?.stop();
    localVideoTrack?.close();

    await clientRef.current.publish(cam);

    setLocalVideoTrack(cam);
    setToggleMedia((prev) => ({
      ...prev,
      ["screenShare"]: false,
      ["camOn"]: true,
    }));
  };

  const value = {
    leave,
    join,
    loading,
    joined,
    localVideoTrack,
    localAudioTrack,
    toggleCamera,
    toggleMIC,
    camOn,
    micOn,
    screenShare,
    expiresAt,
    stopScreenShare,
    startScreenShare,
    remoteUsers,
  };
  return (
    <BookingsContext.Provider value={value}>
      {children}
      {joined && <VideoCall appointment={appointment} expiresAt={expiresAt} />}
    </BookingsContext.Provider>
  );
};

export const useBookingsContext = (): BookingsContextType => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error(
      "useBookingsContext must be used within a BookingsProvider",
    );
  }
  return context;
};
