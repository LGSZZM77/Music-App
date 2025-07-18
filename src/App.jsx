import { useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ARTIST_IMG } from "./assets/imgAdress";
import { SONG_TITLE } from "./assets/songTitle";
import Controls from "./Controls";
import { ChevronsUp, ChevronsDown } from "lucide-react";
import { useStore } from "./store";

function App() {
  const ARTISTS = [
    { id: "yorushika", name: "요루시카" },
    { id: "kenshi", name: "요네즈 켄시" },
    { id: "yoasobi", name: "요아소비" },
  ];

  const ARTIST_BACKGROUND = {
    yorushika: "#233876",
    kenshi: "#014737",
    yoasobi: "#751A3D",
  };

  const TRACK_BACKGROUND = {
    yorushika: "#1C64F2",
    kenshi: "#057A55",
    yoasobi: "#D61F69",
  };

  const SONG_FILE = {
    yorushika: ["いって", "ただ君に晴れ"],
    kenshi: ["lemon", "lady"],
    yoasobi: ["アイドル", "勇者"],
  };

  const { artistIndex, songIndex, isPlaying, activeIndex, setArtistIndex, setSongIndex, setIsPlaying, setActiveIndex } =
    useStore();

  const currentArtist = ARTISTS[artistIndex];
  const song = `${currentArtist.id}/${SONG_FILE[currentArtist.id][songIndex]}.mp3`;
  const thumbnail = `${currentArtist.id}/${SONG_FILE[currentArtist.id][songIndex]}.jpg`;

  const songTitle = SONG_TITLE[currentArtist.id][songIndex];

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

  useEffect(() => {
    const color = ARTIST_BACKGROUND[currentArtist.id];
    const color2 = TRACK_BACKGROUND[currentArtist.id];

    document.body.style.background = color;

    document.querySelectorAll(".left-line").forEach((el) => {
      el.style.background = "";
    });
    document.querySelector(".left-line.active").style.background = color2;
  }, [artistIndex, songIndex]);

  useEffect(() => {
    const audio = new Audio("click/keypress.mp3");
    audio.preload = "auto";

    const handleButtonClick = (e) => {
      const button = e.target.closest("button");
      if (button) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    // true - 캡처링
    document.addEventListener("click", handleButtonClick, true);

    return () => {
      document.removeEventListener("click", handleButtonClick, true);
    };
  }, []);

  return (
    <div id="music">
      <div className="top">
        <div className="container">
          <div className="artist-box">
            {ARTISTS.map((item, index) => (
              <button
                key={index}
                className={`artist-img ${activeIndex === index ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                  setArtistIndex(index);
                  setSongIndex(0);
                }}
                aria-label={`Select artist ${item.name}`}
              >
                <img src={ARTIST_IMG[item.id]} alt={item.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mid">
        <div className="artist">
          <h2>{currentArtist.name}</h2>
        </div>
        <div className="img">
          <img src={thumbnail} alt="album" />
        </div>
        <div className="track">
          <div className="left">
            {SONG_TITLE[currentArtist.id].map((item, index) => (
              <div className={`left-line ${songIndex === index ? "active" : ""}`} key={index}>
                <button
                  onClick={() => {
                    setSongIndex(index);
                  }}
                  aria-label={`Play song ${item}`}
                >
                  {index + 1}. {item}
                </button>
              </div>
            ))}
          </div>
          <div className="right">
            <button aria-label="Scroll up">
              <ChevronsUp />
            </button>
            <button aria-label="Scroll down">
              <ChevronsDown />
            </button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="container">
          <Controls song={song} songTitle={songTitle} maxIndex={SONG_TITLE[currentArtist.id].length - 1} />
        </div>
      </div>
    </div>
  );
}

export default App;
