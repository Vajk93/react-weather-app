import "./Main.css";
import React from "react";
import { useState } from "react";
import moment from "moment";
import "./ForecastTable.css";

// import ForecastTable from "../forecast-table/ForecastTable";

function Main() {
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
  // let [hours168, setHours168] = useState("--hours168--");
  // let [temps168, setTemps168] = useState("--temps168--");
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

        // fetch table datas
        fetchTableDatas(fetchedDatas.latitude, fetchedDatas.longitude);
      });
  }

  let today = moment().format("dddd");
  let tomorrow = moment().add(1, "days").format("dddd");
  let day3 = moment().add(2, "days").format("dddd");
  let day4 = moment().add(3, "days").format("dddd");
  let day5 = moment().add(4, "days").format("dddd");
  let day6 = moment().add(5, "days").format("dddd");
  let day7 = moment().add(6, "days").format("dddd");

  let [tableRow, setTableRow] = useState("");

  const fetchTableDatas = (latitude, longitude) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
    )
      .then((response) => response.json())
      .then((data) => {
        // itt dolgozhatunk a válaszon, például kiírhatjuk a konzolra
        console.log(data.hourly.temperature_2m);
        let hours = [data.hourly.time];
        let temperatures = [data.hourly.temperature_2m];
        console.log(hours);
        console.log(temperatures);
        let newRow = (
          <React.Fragment>
            <tr>
              <td>22:00</td>
              <td>{temperatures[0][22]}</td>
              <td>{temperatures[0][46]}</td>
              <td>{temperatures[0][70]}</td>
              <td>{temperatures[0][94]}</td>
              <td>{temperatures[0][118]}</td>
              <td>{temperatures[0][142]}</td>
              <td>{temperatures[0][166]}</td>
            </tr>
            <tr>
              <td>18:00</td>
              <td>{temperatures[0][18]}</td>
              <td>{temperatures[0][42]}</td>
              <td>{temperatures[0][66]}</td>
              <td>{temperatures[0][90]}</td>
              <td>{temperatures[0][114]}</td>
              <td>{temperatures[0][138]}</td>
              <td>{temperatures[0][162]}</td>
            </tr>
            <tr>
              <td>14:00</td>
              <td>{temperatures[0][14]}</td>
              <td>{temperatures[0][38]}</td>
              <td>{temperatures[0][62]}</td>
              <td>{temperatures[0][86]}</td>
              <td>{temperatures[0][110]}</td>
              <td>{temperatures[0][134]}</td>
              <td>{temperatures[0][158]}</td>
            </tr>
            <tr>
              <td>10:00</td>
              <td>{temperatures[0][10]}</td>
              <td>{temperatures[0][34]}</td>
              <td>{temperatures[0][58]}</td>
              <td>{temperatures[0][82]}</td>
              <td>{temperatures[0][106]}</td>
              <td>{temperatures[0][130]}</td>
              <td>{temperatures[0][154]}</td>
            </tr>
            <tr>
              <td>06:00</td>
              <td>{temperatures[0][6]}</td>
              <td>{temperatures[0][30]}</td>
              <td>{temperatures[0][54]}</td>
              <td>{temperatures[0][78]}</td>
              <td>{temperatures[0][102]}</td>
              <td>{temperatures[0][126]}</td>
              <td>{temperatures[0][150]}</td>
            </tr>
            <tr>
              <td>02:00</td>
              <td>{temperatures[0][2]}</td>
              <td>{temperatures[0][26]}</td>
              <td>{temperatures[0][50]}</td>
              <td>{temperatures[0][74]}</td>
              <td>{temperatures[0][98]}</td>
              <td>{temperatures[0][122]}</td>
              <td>{temperatures[0][146]}</td>
            </tr>
          </React.Fragment>
        );
        setTableRow(newRow);
      })
      .catch((error) => {
        // itt dolgozhatunk az esetleges hibával
        console.error(error);
      });
  };

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
                <table class="GeneratedTable">
                  <thead>
                    <tr>
                      <th>Hour</th>
                      <th>{today}</th>
                      <th>{tomorrow}</th>
                      <th>{day3}</th>
                      <th>{day4}</th>
                      <th>{day5}</th>
                      <th>{day6}</th>
                      <th>{day7}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRow}
                    {/* <tr>
                      <td>22:00</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>18:00</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>14:00</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>10:00</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>06:00</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>02:00</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                      <td>Cell</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
