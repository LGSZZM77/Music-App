import { useEffect, useRef, useState } from "react";
import { Play, Pause, ChevronsLeft, ChevronsRight, Volume1, Volume2 } from "lucide-react";
import { useStore } from "./store";

function Controls({ song, songTitle, maxIndex }) {
  const { isPlaying, setIsPlaying, songIndex, setSongIndex } = useStore();

  const audioRef = useRef(null);

  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 볼륨
  const volumeUp = () => {
    setVolume(Math.min(1, volume + 0.1));
  };

  const volumeDown = () => {
    setVolume(Math.max(0, volume - 0.1));
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  // 재생시간
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(false);
    }
  }, [song]);

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="control-box">
      <h2 className="title">{songTitle}</h2>
      <div className="time">
        <div>{formatTime(currentTime)}</div>
        <div className="progress">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="0.01"
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              audioRef.current.play();
              setIsPlaying(true);
            }}
            aria-label="Audio progress control"
          />
        </div>
        <div>{formatTime(duration)}</div>
      </div>
      <div className="controls">
        <button onClick={volumeDown} aria-label="Volume down">
          <Volume1 />
        </button>

        <button onClick={() => setSongIndex(Math.max(songIndex - 1, 0))} aria-label="Previous track">
          <ChevronsLeft />
        </button>

        <audio ref={audioRef} src={song} preload="metadata" />
        <button
          onClick={() => {
            if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            } else {
              audioRef.current.play();
              setIsPlaying(true);
            }
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause style={{ fill: "white" }} /> : <Play style={{ fill: "white" }} />}
        </button>
        <button onClick={() => setSongIndex(Math.min(songIndex + 1, maxIndex))} aria-label="Next track">
          <ChevronsRight />
        </button>

        <button onClick={volumeUp} aria-label="Volume up">
          <Volume2 />
        </button>
      </div>
    </div>
  );
}

export default Controls;
