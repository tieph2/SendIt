import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Countdown = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() + 1);

    const intervalId = setInterval(() => {
      const now = new Date();
      //@ts-ignore
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const totalSeconds = Math.floor(difference / 1000);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = Math.floor(totalSeconds % 60);

        setCountdown({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={"countDownTimer"}>
      {countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? (
        <>
          <p>Event is live!!</p>
          <div className={"btn btn-primary"}>
            <button><Link to={"/boulders"}>Climb now!</Link></button>
          </div>
        </>

      ) : (
        <p>
          Event starts in {countdown.hours}:{countdown.minutes}:{countdown.seconds}
        </p>
      )}
    </div>
  );
};

export default Countdown;
