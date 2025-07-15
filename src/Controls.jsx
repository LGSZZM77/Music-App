import { useEffect, useRef, useState } from "react";

function Controls({ song, isPlaying, setIsPlaying, songTitle, songIndex, setSongIndex, maxIndex }) {
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
        <div className="progress"></div>
        <div>{formatTime(duration)}</div>
      </div>
      <div className="controls">
        <button onClick={volumeDown}>볼륨다운</button>
        <button onClick={() => setSongIndex(Math.max(songIndex - 1, 0))}>이전</button>

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
        >
          {isPlaying ? "일시정지" : "재생"}
        </button>
        <button onClick={() => setSongIndex(Math.min(songIndex + 1, maxIndex))}>다음</button>

        <button onClick={volumeUp}>볼륨업</button>
      </div>
    </div>
  );
}

export default Controls;
