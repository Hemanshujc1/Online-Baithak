import { useEffect, useState } from 'react';

function calculateTimeLeft(targetTime: Date) {
  const now = new Date();
  const difference = targetTime.getTime() - now.getTime();

  if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

interface CountdownTimerProps {
  targetTime: Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetTime, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTime));
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetTime);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0 &&
        !hasCompleted
      ) {
        setHasCompleted(true);
        if (onComplete) onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, onComplete, hasCompleted]);

  const { hours, minutes, seconds } = timeLeft;

  return (
    <p className="text-sm font-medium text-gray-300">
      {hours > 0
        ? `Starting in: ${hours} h : ${minutes} m`
        : minutes > 0
        ? `Starting in: ${minutes} m : ${seconds} s`
        : `Starting in: ${seconds} s`}
    </p>
  );
};

export default CountdownTimer;
