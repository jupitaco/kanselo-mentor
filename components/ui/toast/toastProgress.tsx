"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/libs/utils";

interface ToastProgressProps {
  duration: number;
  className?: string;
}

export const ToastProgress: React.FC<ToastProgressProps> = ({
  duration,
  className,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const progressPercentage = (remaining / duration) * 100;

      setProgress(progressPercentage);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 16); // ~60fps for smooth animation

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={cn(
        "absolute bottom-1 left-1 h-1 w-[98%] bg-white/20",
        className,
      )}
    >
      <div
        className="h-full bg-white/60 transition-all duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
