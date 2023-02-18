import "./Main.css";
import React from "react";
import { useState } from "react";

function Main(props) {
  // budapest coordinates for testing
  // let latitude = 47.53;
  // let longitude = 19.12;

  // the city is tricky, because we sent the city to a function, where it converts to cityToGeoCode, and the geocode will return the city again, just from API now
  let city;
  let [writeInteractiveValue, setWriteInteractiveValue] = useState("na mizu?");
  let lat;
  let lon;
  const apiKey = "5a8deffcb12650777e1969f671422327";
  let fetchedDatas = {};
  let [renderedCity, setRenderedCity] = useState("--city--");
  let [desc, setDesc] = useState("--desc--");
  let [celsius, setCelsius] = useState("--celsius--");
  let [maxCelsius, setMaxCelsius] = useState("--maxCelsius--");
  let [minCelsius, setMinCelsius] = useState("--minCelsius--");
  let [longitude, setLongitude] = useState("--longitude--");
  let [latitude, setLatitude] = useState("--latitude--");
  let [hours168, setHours168] = useState("--hours168--");
  let [temps168, setTemps168] = useState("--temps168--");
  let [windDeg, setWindDeg] = useState("--windDeg--");
  let [windSpeed, setWindSpeed] = useState("--windSpeed--");

  const addValChangeHandler = (e) => {
    city = e.target.value;
    setWriteInteractiveValue(e.target.value);
    console.log(e.target.value);
    console.log(city);
  };

  // geolocation api with city
  // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

  // fetch geo code from city name:
  function cityToGeoCode() {
    // console.log(city);
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${writeInteractiveValue}&limit=5&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        console.log(data[0].name);
        city = data[0].name;
        lat = data[0].lat;
        lon = data[0].lon;
        console.log("fetching coords from city name OK!:" + lat, lon);
      })
      .then(() => {
        fetchFromGeoCode();
      });
  }

  // fetch wheather from geo code
  function fetchFromGeoCode() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetchedDatas = {
          cityName: city,
          desc: data.weather[0].description,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          fahreit: data.main.temp,
          maxFahreit: data.main.temp_max,
          minFahreit: data.main.temp_min,
          celsius: data.main.temp,
          maxCelsius: data.main.temp_max,
          minCelsius: data.main.temp_min,
          longitude: data.coord.lon,
          latitude: data.coord.lat,
          hours168: "hours",
          temps168: "temp168",
          windDeg: data.wind.deg,
          windSpeed: data.wind.speed,
        };

        let convertedToCelsius = fetchedDatas.celsius - 273.15;
        convertedToCelsius = Math.round(convertedToCelsius * 10) / 10;

        let convertedToMinCelsius = fetchedDatas.minCelsius - 273.15;
        convertedToMinCelsius = Math.round(convertedToMinCelsius * 10) / 10;

        let convertedToMaxCelsius = fetchedDatas.maxCelsius - 273.15;
        convertedToMaxCelsius = Math.round(convertedToMaxCelsius * 10) / 10;

        setRenderedCity(fetchedDatas.cityName);
        setCelsius(convertedToCelsius);
        setDesc(fetchedDatas.desc);
        setMinCelsius(convertedToMinCelsius);
        setMaxCelsius(convertedToMaxCelsius);
        setWindSpeed(fetchedDatas.windSpeed);
        setWindDeg(fetchedDatas.windDeg);
        setLongitude(fetchedDatas.longitude);
        setLatitude(fetchedDatas.latitude);
      });
  }

  return (
    <React.Fragment>
      <div id="section1" className="text-center">
        <div className="container">
          <h1 className="pb-5">Wheater API</h1>
          <p>{writeInteractiveValue}</p>
          <div className="input-container">
            <input
              onChange={addValChangeHandler}
              id="input"
              className="form-control w-50"
              type="text"
            />
          </div>
          <br />
          <button onClick={cityToGeoCode} id="btn" className="btn btn-primary">
            LET'S SEE
          </button>
        </div>
      </div>
      <div id="datas" className="container">
        <div className="datasGridContainer">
          <div className="coordinates">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Coordinates</h5>
                <p className="card-text">
                  longitude: <br></br>
                  {longitude} <br></br>
                  latitude: <br></br>
                  {latitude}
                </p>
              </div>
            </div>
          </div>
          <div className="city-and-country">
            {" "}
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{renderedCity}</h5>
                  <h5 className="card-title">{celsius}°C</h5>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{desc}</h6>
                <p className="card-text">
                  min: {minCelsius}°C <br></br>
                  max: {maxCelsius}°C
                </p>
              </div>
            </div>
          </div>
          <div className="secondary-datas">
            {" "}
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Wind</h5>
                </div>
                <p className="card-text">
                  speed: {windSpeed} km/hour <br></br>
                  degree: {windDeg}°
                </p>
              </div>
            </div>
          </div>
          <div className="graph">
            {" "}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
