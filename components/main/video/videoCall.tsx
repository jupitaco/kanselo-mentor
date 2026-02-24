"use client";

import Button from "@/components/ui/button";
import CountDownTimer from "@/components/ui/countDownTimer";
import { Participant, useBookingsContext } from "@/context/bookingsContext";
import { allImages } from "@/public/images/images";
import { formatDate } from "@/utils/helper";
import Image from "next/image";
import { useState } from "react";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { LuAlarmClock, LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { ParticipantTitle, ScreenSharing } from "./remoteVideo";

export default function VideoCall() {
  const {
    micOn,
    camOn,
    toggleCamera,
    toggleMIC,
    leave,
    joined,
    appointment,
    stopScreenShare,
    startScreenShare,
    screenShare,
    participants,
    duration,
  } = useBookingsContext();

  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const participantList = Object.values(participants);

  const screenSharer = participantList.find((p) => p.screenTrack);

  const gridUsers = participantList;

  return (
    <section className="no-scrollbar fixed top-0 left-0 z-50 h-screen w-full space-y-5 overflow-y-auto bg-black/80 pb-8 backdrop-blur-xs md:overflow-hidden">
      <header className="border-grey-100 sticky top-0 left-0 z-50 h-20 border-b bg-white/80 py-3 backdrop-blur-xs">
        <div className="flex items-center justify-between px-8">
          <div className="hidden max-w-md md:block">
            <h4 className="text-sm">{appointment?.mentorId?.bio}</h4>
            <h5 className="text-grey-300 text-xs font-medium">
              {formatDate(appointment?.selectedDate)} |{" "}
              {appointment?.selectedTime}- {appointment?.selectedEndTime}
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
              <small className="text-grey-400">Mentor</small>
            </div>
          </div>
        </div>
      </header>

      <section className="flex h-[calc(100vh-200px)] flex-col gap-2 overflow-y-auto p-5 lg:flex-row">
        {screenShare && (
          <ScreenSharing participant={screenSharer as Participant} />
        )}
        <ParticipantTitle participant={gridUsers} />
      </section>

      <footer className="border-grey-100 min-h-40 border-t bg-white/80 px-2 py-3 md:min-h-20">
        {joined && (
          <article className="mx-auto flex w-full flex-wrap items-center justify-between gap-4 lg:max-w-9/12">
            <ul className="flex flex-1 flex-wrap items-center gap-3">
              <li>
                {!screenShare ? (
                  <Button
                    onClick={startScreenShare}
                    className={"bg-secondary rounded-full! text-white"}
                  >
                    <LuScreenShare size={16} />
                  </Button>
                ) : (
                  <Button
                    onClick={stopScreenShare}
                    className={"bg-accent-400 rounded-full! text-white"}
                  >
                    <LuScreenShareOff size={16} />
                  </Button>
                )}
              </li>
              <li>
                <Button
                  className={`${!micOn ? "bg-secondary" : "bg-accent-400"} rounded-full! text-white`}
                  onClick={toggleMIC}
                >
                  {!micOn ? (
                    <IoMicOffOutline size={16} />
                  ) : (
                    <IoMicOutline size={16} />
                  )}
                </Button>
              </li>
              <li>
                <Button
                  className={`${!camOn ? "bg-secondary" : "bg-accent-400"} rounded-full! text-white`}
                  onClick={toggleCamera}
                >
                  {!camOn ? (
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
