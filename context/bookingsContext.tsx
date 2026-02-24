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

export type Participant = {
  uid: number | "local";
  isLocal: boolean;
  micOn?: boolean;
  camOn?: boolean;
  cameraTrack?: ILocalVideoTrack | IAgoraRTCRemoteUser["videoTrack"];
  screenTrack?: ILocalVideoTrack | IAgoraRTCRemoteUser["videoTrack"];
  audioTrack?: IMicrophoneAudioTrack | IAgoraRTCRemoteUser["audioTrack"];
};

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
  duration: number;
  appointment: BookingType;
  stopScreenShare: () => void;
  startScreenShare: () => void;
  participants: Record<string, Participant>;
};

const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined,
);

export const BookingsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [{ micOn, camOn, screenShare, expiresAt, duration }, setToggleMedia] =
    useState<{
      micOn: boolean;
      camOn: boolean;
      screenShare: boolean;
      expiresAt: string;
      duration: number;
    }>({
      micOn: false,
      camOn: false,
      screenShare: false,
      expiresAt: "",
      duration: 0,
    });
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [appointment, setAppointment] = useState<BookingType>(
    {} as BookingType,
  );
  const [participants, setParticipants] = useState<Record<string, Participant>>(
    {},
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
    const participantId = appointmentData?.mentorId?._id;
    setLoading({ [appointmentData?._id]: true });
    const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

    const rsp = await startVideoCallAction(bookingId, participantId);

    if (rsp?.error && !rsp?.data) {
      handleError(rsp?.message);
      setLoading({ [appointmentData?._id]: false });
      return;
    }

    if (!rsp?.error && rsp?.data) {
      setLoading({ [appointmentData?._id]: false });
      setToggleMedia((prev) => ({
        ...prev,
        camOn: true,
        micOn: true,
        duration: rsp?.data?.sessionDurationMinutes,
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
          setParticipants((prev) => ({
            ...prev,
            [user.uid]: {
              ...(prev[user.uid] ?? { uid: user.uid, isLocal: false }),
              audioTrack: user.audioTrack,
            },
          }));
          return;
        }

        if (mediaType === "video") {
          const track = user.videoTrack!;
          const label = track.getMediaStreamTrack().label.toLowerCase();
          const isScreen = label.includes("screen");

          setParticipants((prev) => ({
            ...prev,
            [user.uid]: {
              ...(prev[user.uid] ?? { uid: user.uid, isLocal: false }),
              ...(isScreen ? { screenTrack: track } : { cameraTrack: track }),
            },
          }));
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        setParticipants((prev) => {
          const p = prev[user.uid];
          if (!p) return prev;

          return {
            ...prev,
            [user.uid]: {
              ...p,
              ...(mediaType === "video"
                ? { cameraTrack: undefined, screenTrack: undefined }
                : {}),
            },
          };
        });
      });

      client.on("user-left", (user) => {
        setParticipants((prev) => {
          const copy = { ...prev };
          delete copy[user.uid];
          return copy;
        });
      });

      // 4️⃣ Create tracks
      const [mic, cam] = await AgoraRTC.createMicrophoneAndCameraTracks();

      setParticipants((prev) => ({
        ...prev,
        local: {
          uid: "local",
          isLocal: true,
          camOn: cam ? true : false,
          micOn: mic ? true : false,
          cameraTrack: cam,
          audioTrack: mic,
        },
      }));

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

    const next = !micOn;
    await localAudioTrack.setEnabled(next);

    setToggleMedia((prev) => ({ ...prev, micOn: next }));

    setParticipants((prev) => {
      const local = prev.local;
      if (!local) return prev;

      return {
        ...prev,
        local: {
          ...local,
          micOn: next,
        },
      };
    });
  };

  const toggleCamera = async () => {
    if (!localVideoTrack || !clientRef.current) return;

    const next = !camOn;
    await localVideoTrack.setEnabled(next);

    // 🔑 If screen sharing, camera is NOT auto-published
    if (screenShare) {
      if (next) {
        // turn camera ON → publish it
        await clientRef.current.publish(localVideoTrack);
      } else {
        // turn camera OFF → unpublish it
        await clientRef.current.unpublish(localVideoTrack);
      }
    }

    setToggleMedia((prev) => ({ ...prev, camOn: next }));

    setParticipants((prev) => ({
      ...prev,
      local: {
        ...prev.local,
        camOn: next,
        cameraTrack: localVideoTrack, // keep reference
      },
    }));
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

    await clientRef.current!.unpublish(localVideoTrack!);

    console.log("screen-track>>>", screenTrack);

    setParticipants((prev) => ({
      ...prev,
      local: {
        ...prev.local,
        cameraTrack: undefined,
        screenTrack: screenTrack,
      },
    }));

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
    participants,
    appointment,
    duration,
  };
  return (
    <BookingsContext.Provider value={value}>
      {children}
      {joined && <VideoCall />}
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
