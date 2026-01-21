"use client";

import { cn } from "@/libs/utils";
import React, { Dispatch, SetStateAction, useEffect } from "react";

const CountDownTimer = ({
  noTitle,
  timeLeft,
  setTimeLeft,
  className,
}: {
  className?: string;
  timeLeft: number;
  noTitle?: boolean;
  setTimeLeft: Dispatch<SetStateAction<number>>;
}) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const setTimer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(setTimer);
    }
  }, [timeLeft, setTimeLeft]);

  //   const formatTimeInSeconds = (time: number) => {
  //     const Day = Math.floor(time / (60 * 60 * 24));
  //     const Hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
  //     const Minutes = Math.floor((time % (60 * 60)) / 60);
  //     const Seconds = Math.floor(time % 60);

  //     return `${Day}: ${Hours}: ${Minutes}: ${Seconds}`;
  //   };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <span className={cn("text-sm font-semibold", className)}>
      {!noTitle && "Resend in "}
      {formatTime(timeLeft)}
    </span>
  );
};

export default CountDownTimer;
