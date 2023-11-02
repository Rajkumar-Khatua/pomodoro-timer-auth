import React, { useState, useEffect } from "react";
import soundFile from "../../src/sound.mp3";
import { auth } from "../firebase";

function Timer() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const user = auth.currentUser;
  const userName = user.displayName;
  const userPhotoUrl = user.photoURL;

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    let interval = null;
    const audio = new Audio(soundFile);

    if (isActive || isBreak) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (soundEnabled) {
              audio.play();
            }
            clearInterval(interval);
            setIsActive(!isActive);
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
  };

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isBreak
          ? "bg-gradient-to-r from-green-100 to-teal-100"
          : "bg-gradient-to-r from-sky-100 to-violet-100"
      }`}
    >
      <div className="absolute top-0 right-0 p-4 flex items-center gap-2 sm:gap-5">
        <img
          src={
            userPhotoUrl ||
            "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-857.jpg?w=826&t=st=1698906239~exp=1698906839~hmac=2f6bbd955273f816ce73bfdd36e1e84a0129029524b7777ed27d661e35951d8d"
          }
          alt="User"
          className="rounded-full w-8 h-8 sm:w-12 sm:h-12"
        />
        <p className="hidden sm:block text-base sm:text-lg">{userName}</p>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-yellow-300 to-amber-300 py-2 px-6 sm:py-3 sm:px-9 shadow-lg rounded-full text-white font-bold hover:bg-gradient-to-r from-yellow-400 to-amber-500"
        >
          Logout
        </button>
      </div>

      <div
        className={`text-6xl ${
          isBreak
            ? "bg-gradient-to-r from-green-400 to-emerald-300"
            : "bg-gradient-to-r from-red-50 to-neutral-50"
        } text-black rounded-full w-64 h-64 flex items-center justify-center shadow-lg`}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="flex flex-col space-y-4 mt-4 sm:space-y-0 sm:flex-row sm:space-x-4">
        <button
          className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg w-full sm:w-auto sm:py-4 px-10"
          onClick={start}
        >
          Start
        </button>
        <button
          className="bg-gradient-to-r from-yellow-200 to-yellow-400 hover:bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg w-full sm:w-auto sm:py-4 sm:px-10"
          onClick={pause}
        >
          Pause
        </button>
        <button
          className="bg-gradient-to-r from-rose-500 to-rose-600 hover:bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold py-3 px-6 rounded-full shadow-lg w-full sm:w-auto sm:py-4 sm:px-10"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="mt-4 text-xl">{isBreak ? "Break Time" : "Work Time"}</div>
      <button
        className={`mt-4 ${
          soundEnabled ? "bg-green-500" : "bg-red-500"
        } hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg`}
        onClick={() => setSoundEnabled(!soundEnabled)}
      >
        {soundEnabled ? "Sound Enabled" : "Sound Disabled"}
      </button>
    </div>
  );
}

export default Timer;
