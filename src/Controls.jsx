import { useEffect, useRef, useState } from "react";

function Controls() {
  const audioRef = useRef(null);
  const playRef = useRef(null);

  const [song, setSong] = useState("yorushika/말해줘.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingText, setIsPlayingText] = useState("재생");
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 재생/일시정지
  useEffect(() => {
    const audio = audioRef.current;
    const play = playRef.current;

    const handlePlayClick = () => {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setIsPlayingText("재생");
      } else {
        audio.play();
        setIsPlaying(true);
        setIsPlayingText("일시정지");
      }
    };

    play.addEventListener("click", handlePlayClick);
  }, [isPlaying]);

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
  }, []);

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="control-box">
      <h2 className="title">제목</h2>
      <div className="time">
        <div>{formatTime(currentTime)}</div>
        <div className="progress"></div>
        <div>{formatTime(duration)}</div>
      </div>
      <div className="controls">
        <button onClick={volumeDown}>볼륨다운</button>
        {/* <button>이전</button> */}
        <audio ref={audioRef} src={song} />
        <button ref={playRef}>{isPlayingText}</button>
        {/* <button>다음</button> */}
        <button onClick={volumeUp}>볼륨업</button>
      </div>
    </div>
  );
}

export default Controls;
