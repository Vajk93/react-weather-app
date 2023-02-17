import "./Hero.css";

function Hero() {
  return (
    <div id="section1" className="text-center">
      <div className="container">
        <h1 className="pb-5">Wheater API</h1>
        <p>Write here your city name:</p>
        <div className="input-container">
          <input id="input" className="form-control w-50" type="text" />
        </div>
        <br />
        <button id="btn" className="btn btn-primary">
          LET'S SEE
        </button>
      </div>
    </div>
  );
}

export default Hero;
