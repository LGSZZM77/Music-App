import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ARTIST_IMG } from "./assets/imgAdress";
import Controls from "./Controls";

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
          <Controls />
        </div>
      </div>
    </div>
  );
}

export default App;
