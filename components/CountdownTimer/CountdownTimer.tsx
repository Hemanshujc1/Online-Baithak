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
const CountdownTimer = ({ targetTime }: { targetTime: Date }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const { hours, minutes, seconds } = timeLeft;
  const isUrgent = hours === 0 && minutes < 1;

  return (
    <p className={`text-sm font-medium ${isUrgent ? "animate-pulse text-red-400" : "text-gray-300"}`}>
      {hours > 0
        ? `Starting in: ${hours} h : ${minutes} m`
        : minutes > 0
        ? `Starting in: ${minutes} m : ${seconds} s`
        : `Starting in: ${seconds} s`}
    </p>
  );
};
