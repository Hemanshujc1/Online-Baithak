import { useEffect, useState } from 'react';

function calculateTimeLeft(targetTime: Date) {
  const now = new Date();
  const difference = targetTime.getTime() - now.getTime();

  if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0, isTimeUp: true };

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, isTimeUp: false };
}

const CountdownTimer = ({ targetTime }: { targetTime: Date }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTime));


  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout; 
  
    const syncInterval = () => {
      setTimeLeft(calculateTimeLeft(targetTime));
      interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetTime));
      }, 1000);
    };
  
    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();
  
    timeout = setTimeout(syncInterval, msUntilNextSecond);
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [targetTime]);
  

  const { hours, minutes, seconds, isTimeUp } = timeLeft;
  const isUrgent = hours === 0 && minutes < 1 && !isTimeUp;

  return (
    <p className={`text-sm font-medium ${isUrgent ? "animate-pulse text-red-400" : "text-gray-300"}`}>
      {isTimeUp
        ? 'Starting now!'
        : hours > 0
        ? `Starting in: ${hours} h : ${minutes} m`
        : minutes > 0
        ? `Starting in: ${minutes} m : ${seconds} s`
        : `Starting in: ${seconds} s`}
    </p>
  );
};

export default CountdownTimer;
