import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  const searchCity = (e) => {
    setInput(e.target.value);
  };

  const searchInput = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API}&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API}&q=Tashkent`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      {weather && (
        <div>
          <div className="search">
            <input
              onChange={searchCity}
              placeholder="Country or City"
              type="text"
              className="input"
            />
            <button onClick={searchInput}>search</button>
          </div>
          <div className="info">
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
            <div className="condition">
              <p>{weather.current.condition.text}</p>
              <img src={weather.current.condition.icon} alt="" />
              <p>{weather.current.temp_c} C</p>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default App;
