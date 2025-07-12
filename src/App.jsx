import "./App.css";

function App() {
  const artistImg = [1, 2, 3];

  return (
    <div id="music">
      <div className="top">
        <div className="container">
          <div className="artist-box">
            <button>이전</button>
            {artistImg.map((item, index) => (
              <div
                key={index}
                className="artist-img"
                onClick={() => {
                  alert("클릭");
                }}
              >
                {item}
              </div>
            ))}
            <button>다음</button>
          </div>
        </div>
      </div>
      <div className="mid">
        <div className="artist"></div>
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
