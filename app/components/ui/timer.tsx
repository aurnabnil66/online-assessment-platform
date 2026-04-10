"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/helpers";

interface TimerProps {
  duration: number; // in minutes
  onTimeout: () => void;
  isActive: boolean;
}

export function Timer({ duration, onTimeout, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout, isActive]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft < 300; // 5 minutes warning
  const isCritical = timeLeft < 60; // 1 minute critical

  return (
    <div
      className={cn(
        "text-2xl font-mono font-bold px-4 py-2 rounded-lg",
        isCritical
          ? "bg-red-100 text-red-700"
          : isWarning
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700",
      )}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
