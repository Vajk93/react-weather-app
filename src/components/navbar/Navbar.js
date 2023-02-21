import "./Navbar.css";

function Navbar() {
  return (
    <div id="navbar">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="./">
              Weather App
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="./" className="nav-link" aria-current="page">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./" className="nav-link">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./" className="nav-link">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
