import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetTime }: { targetTime: Date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetTime.getTime() - now.getTime();

    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const { hours, minutes, seconds } = timeLeft;

  // 🎨 Optional: pulse effect if <1min
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

export default CountdownTimer;
