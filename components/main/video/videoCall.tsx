"use client";

import Button from "@/components/ui/button";
import CountDownTimer from "@/components/ui/countDownTimer";
import { useBookingsContext } from "@/context/bookingsContext";
import { allImages } from "@/public/images/images";
import { BookingType } from "@/types/bookings";
import { formatDate } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { LuAlarmClock, LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { RemoteVideo } from "./remoteVideo";

export default function VideoCall({
  expiresAt,
  appointment,
}: {
  expiresAt: string;
  appointment: BookingType;
}) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(() => {
    const expiry = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((expiry - now) / 1000));
  });

  const {
    micOn,
    camOn,
    toggleCamera,
    toggleMIC,
    leave,
    joined,
    localVideoTrack,
    stopScreenShare,
    startScreenShare,
    screenShare,
    remoteUsers,
  } = useBookingsContext();

  useEffect(() => {
    if (localVideoTrack && videoRef.current) {
      localVideoTrack.play(videoRef.current);
    }
  }, [localVideoTrack]);

  return (
    <section className="no-scrollbar fixed top-0 left-0 z-50 h-screen w-full space-y-5 overflow-y-auto bg-white/80 pb-8 backdrop-blur-xs">
      <header className="border-grey-100 sticky top-0 left-0 z-50 h-20 border-b py-3">
        <div className="flex items-center justify-between px-8">
          <div className="hidden max-w-md md:block">
            <h4 className="text-sm">{appointment?.mentorId?.bio}</h4>
            <h5 className="text-grey-300 text-xs font-medium">
              {formatDate(appointment?.selectedDate)} |{" "}
              {formatDate(appointment?.selectedDate, true)}
            </h5>
          </div>
          <div className="flex items-center justify-end gap-2 rounded-full! px-3 py-2">
            <figure className="relative size-12 overflow-hidden rounded-xl">
              <Image
                src={appointment?.mentorId?.profilePhoto ?? allImages.noAvatar}
                alt="profile"
                className="h-full w-full object-cover"
                fill
                sizes="100%"
              />
            </figure>
            <div className="flex-1">
              <h5 className="text-sm font-medium">
                {appointment?.mentorId?.fullName}
              </h5>
              <small className="text-grey-400">Mentee</small>
            </div>
          </div>
        </div>
      </header>

      <section className="flex h-[calc(100vh-180px)] flex-wrap gap-2 p-5">
        <div
          ref={videoRef}
          className="relative mx-auto h-full flex-1 overflow-hidden rounded-2xl! px-8"
        />

        <RemoteVideo />
      </section>

      <footer className="h-10">
        {joined && (
          <article className="mx-auto flex max-w-9/12 flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-1 flex-wrap items-center gap-3">
              <li>
                {!screenShare ? (
                  <Button
                    onClick={startScreenShare}
                    className="bg-accent-400 rounded-full! text-white"
                  >
                    <LuScreenShare size={20} />
                  </Button>
                ) : (
                  <Button
                    onClick={stopScreenShare}
                    className="bg-accent-400 rounded-full! text-white"
                  >
                    <LuScreenShareOff size={20} />
                  </Button>
                )}
              </li>
              <li>
                <Button
                  className="bg-accent-400 rounded-full! text-white"
                  onClick={toggleMIC}
                >
                  {micOn ? (
                    <IoMicOffOutline size={20} />
                  ) : (
                    <IoMicOutline size={20} />
                  )}
                </Button>
              </li>
              <li>
                <Button
                  className="bg-accent-400 rounded-full! text-white"
                  onClick={toggleCamera}
                >
                  {camOn ? (
                    <IoVideocamOffOutline size={20} />
                  ) : (
                    <IoVideocamOutline size={20} />
                  )}
                </Button>
              </li>
            </ul>
            <div className="bg-grey-300 flex items-center rounded-lg p-1">
              <div className="bg-grey-200 btn flex items-center gap-2 rounded-r-none! text-black">
                <LuAlarmClock />
                <CountDownTimer
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  title="Call end "
                  className="text-black"
                />
              </div>
              <div>
                <Button
                  className="delete-btn w-full rounded-l-none!"
                  onClick={leave}
                >
                  End Call
                </Button>
              </div>
            </div>
          </article>
        )}
      </footer>
    </section>
  );
}
