import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownProps {
  initialTime?: number;
  autoStart?: boolean;
  storageKey?: string; // کلید برای ذخیره در localStorage
}

export function useCountdown({
  initialTime = 60,
  autoStart = false,
  storageKey = "countdown_timer",
}: UseCountdownProps = {}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // هنگام مونت، بررسی کنید که آیا تایمر قبلی وجود دارد
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const startTime = parseInt(stored, 10);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = initialTime - elapsed;

      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsActive(true);
      } else {
        // تایمر تمام شده
        localStorage.removeItem(storageKey);
        setTimeLeft(0);
        setIsActive(false);
      }
    } else if (autoStart) {
      setTimeLeft(initialTime);
      setIsActive(true);
      localStorage.setItem(storageKey, Date.now().toString());
    }
  }, []);

  const start = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
    localStorage.setItem(storageKey, Date.now().toString());
  }, [initialTime, storageKey]);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeLeft(0);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  // تایمر countdown
  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsActive(false);
          localStorage.removeItem(storageKey);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, storageKey]);

  return {
    timeLeft,
    isActive,
    start,
    reset,
  };
}
