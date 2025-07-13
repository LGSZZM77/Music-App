import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ARTIST_IMG } from "./assets/img/adress";

function App() {
  const artistImg = ["요루시카", "요네즈켄시", "요아소비"];
  const [artist, setArtist] = useState("요루시카");
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
  }, [artist]);

  return (
    <div id="music">
      <div className="top">
        <div className="container">
          <div className="artist-box">
            {artistImg.map((item, index) => (
              <div
                key={index}
                className="artist-img"
                onClick={() => {
                  setArtist(item);
                }}
              >
                <img src={ARTIST_IMG[item]} alt={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mid">
        <div className="artist">
          <h2>{artist}</h2>
        </div>
        <div className="img"></div>
        <div className="track"></div>
      </div>
      <div className="bottom">
        <div className="container">
          <div className="control-box">
            <h2 className="title">제목</h2>
            <div className="time">
              <div>0:00</div>
              <div className="progress"></div>
              <div>4:03</div>
            </div>
            <div className="controls">
              <button>볼륨다운</button>
              <button>이전</button>
              <button>재생</button>
              <button>다음</button>
              <button>볼륨업</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
