import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center pb-3">
            <li className="nav-item">
              <a href="./" className="nav-link px-2">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="./" className="nav-link px-2 ">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="./" className="nav-link px-2">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="./" className="nav-link px-2">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="./" className="nav-link px-2">
                About
              </a>
            </li>
          </ul>
          <p className="text-center copyright">&copy; 2022 Company, Inc</p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
