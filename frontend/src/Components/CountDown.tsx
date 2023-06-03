import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const intervalId = setInterval(() => {
      const now = new Date();
      //@ts-ignore
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        setCountdown({ days, hours, minutes });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={"countDownTimer"}>
      {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 ? (
        <p>Event is live!!</p>
      ) : (
        <p>
          Event starts in: {countdown.days}:{countdown.hours}:{countdown.minutes}
        </p>
      )}
    </div>
  );
};

export default Countdown;
