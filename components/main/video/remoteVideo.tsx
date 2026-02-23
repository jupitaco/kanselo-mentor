"use client";

import { Participant, useBookingsContext } from "@/context/bookingsContext";
import { getAvatarGradient, getUserInitials } from "@/utils/helper";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";

export function ParticipantTitle({
  participant,
}: {
  participant: Participant[];
}) {
  const { appointment, screenShare } = useBookingsContext();
  return (
    <ul
      className={`no-scrollbar max-h-[70vh] ${screenShare ? "flex w-fit flex-row gap-4 lg:flex-col" : "flex flex-1 flex-col gap-4 lg:flex-row"} overflow-y-auto`}
    >
      {participant.map((user) => (
        <li
          key={user.uid}
          className={`bg-grey-200 relative p-1 ${screenShare ? "h-20 w-20 rounded-full lg:h-40 lg:w-42" : "h-60 w-full rounded-md lg:h-full lg:w-full lg:flex-1!"} lg:rounded-md`}
        >
          <div className="absolute right-1 z-100 flex items-center justify-end">
            <div
              className={`${!user?.micOn ? "bg-secondary" : "bg-accent-400"} rounded-full! p-1 text-white`}
            >
              {!user?.micOn ? (
                <IoMicOffOutline size={16} />
              ) : (
                <IoMicOutline size={16} />
              )}
            </div>
            <div
              className={`${!user?.camOn ? "bg-secondary" : "bg-accent-400"} rounded-full! p-1 text-white`}
            >
              {!user?.camOn ? (
                <IoVideocamOffOutline size={16} />
              ) : (
                <IoVideocamOutline size={16} />
              )}
            </div>
          </div>
          {user?.camOn ? (
            <RemoteCamera
              track={user.cameraTrack}
              className={`${screenShare ? "rounded-full lg:rounded-md" : "rounded-md"}`}
            />
          ) : (
            <UserInitials
              userName={
                user?.isLocal
                  ? appointment?.mentorId?.fullName
                  : appointment?.userId?.fullName
              }
              className={`${screenShare ? "rounded-full lg:rounded-md" : "rounded-md"}`}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export function ScreenSharing({ participant }: { participant: Participant }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = participant?.screenTrack ?? participant?.cameraTrack;
    if (ref.current && track) {
      track.play(ref.current);
    }
    return () => {
      track?.stop();
    };
  }, [participant?.cameraTrack, participant?.screenTrack]);

  return <div ref={ref} className="h-full flex-1 rounded-md bg-black" />;
}

export function RemoteCamera({
  track,
  className,
}: {
  className?: string;
  track: Participant["cameraTrack"];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // console.log("track>>", track);

  useEffect(() => {
    if (ref.current && track) {
      track.play(ref.current);
    }

    return () => {
      track?.stop();
    };
  }, [track]);

  return <div ref={ref} className={`size-full overflow-hidden ${className}`} />;
}

export const UserInitials = ({
  userName,
  className,
}: {
  userName: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} grid size-full place-items-center`}
      style={getAvatarGradient(userName)}
    >
      <h4 className="font-bols p-3 text-white">
        {getUserInitials(userName) || "N/A"}
      </h4>
    </div>
  );
};
