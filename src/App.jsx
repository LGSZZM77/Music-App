import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ARTIST_IMG } from "./assets/imgAdress";
import { SONG_TITLE } from "./assets/songTitle";
import Controls from "./Controls";

function App() {
  const ARTISTS = [
    { id: "yorushika", name: "요루시카" },
    { id: "kenshi", name: "요네즈 켄시" },
    { id: "yoasobi", name: "요아소비" },
  ];

  const [artistIndex, setArtistIndex] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentArtist = ARTISTS[artistIndex];
  const song = `${currentArtist.id}/${songIndex}.mp3`;
  const songTitle = SONG_TITLE[currentArtist.id][songIndex];

  const [activeIndex, setActiveIndex] = useState(0);

  const mediaQuery = window.matchMedia("(max-width: 767px)");

  useEffect(() => {
    gsap.fromTo(".artist", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    if (mediaQuery.matches) {
      gsap.fromTo(".track", { opacity: 0 }, { opacity: 1, duration: 1 });
    } else {
      gsap.fromTo(".track", { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    }
  }, []);

  useEffect(() => {
    gsap.fromTo(".artist", { opacity: 0 }, { opacity: 1, duration: 0.5 });
    gsap.fromTo(".track", { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, [artistIndex]);

  return (
    <div id="music">
      <div className="top">
        <div className="container">
          <div className="artist-box">
            {ARTISTS.map((item, index) => (
              <div
                key={index}
                className={`artist-img ${activeIndex === index ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                  setArtistIndex(index);
                  setSongIndex(0);
                }}
              >
                <img src={ARTIST_IMG[item.id]} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mid">
        <div className="artist">
          <h2>{currentArtist.name}</h2>
        </div>
        <div className="img">
          <img src={`${currentArtist.id}/${songIndex}.jpg`} alt="album" />
        </div>
        <div className="track"></div>
      </div>
      <div className="bottom">
        <div className="container">
          <Controls
            song={song}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songTitle={songTitle}
            songIndex={songIndex}
            setSongIndex={setSongIndex}
            maxIndex={SONG_TITLE[currentArtist.id].length - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
