"use client";

import { useBookingsContext } from "@/context/bookingsContext";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";

export function RemoteVideo() {
  //   const ref = useRef<HTMLDivElement>(null);
  const { remoteUsers } = useBookingsContext();

  //   useEffect(() => {
  //     if (ref.current && user.videoTrack) {
  //       user.videoTrack.play(ref.current);
  //     }

  //     return () => {
  //       user.videoTrack?.stop();
  //     };
  //   }, [user.videoTrack]);

  return (
    <>
      {Object.values(remoteUsers).map((user) => (
        <div key={user.uid} className={user.screenTrack ? "w-full" : ""}>
          {user.cameraTrack && <RemoteCamera track={user.cameraTrack} />}
          {user.screenTrack && <RemoteScreen track={user.screenTrack} />}
        </div>
      ))}
    </>
  );
  //   return <div ref={ref} className="size-40 overflow-hidden rounded-full!" />;
}

export function RemoteCamera({
  track,
}: {
  track: IAgoraRTCRemoteUser["videoTrack"];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && track) {
      track.play(ref.current);
    }

    return () => {
      track?.stop();
    };
  }, [track]);

  return <div ref={ref} className="size-40 overflow-hidden rounded-full" />;
}

export function RemoteScreen({
  track,
}: {
  track: IAgoraRTCRemoteUser["videoTrack"];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && track) {
      track.play(ref.current);
    }

    return () => {
      track?.stop();
    };
  }, [track]);

  return <div ref={ref} className="h-full w-full rounded-lg bg-black" />;
}
