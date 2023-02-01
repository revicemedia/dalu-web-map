import "./Navbar.css";
import DaLuLogo from "../../images/DaLu-Logo.svg";
import { useState } from "react";

function Navbar() {
  const [scroll, setScroll] = useState(false);

  window.onscroll = function () {
    myFunction();
  };

  function myFunction() {
    if (window.pageYOffset > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }
  return (
    <div className={scroll ? "Navbar shadow" : "Navbar"} id="navbar">
      <div className={scroll ? "Navbar-Inner__sticky" : "Navbar-Inner"}>
        <img src={DaLuLogo} alt="DaLu Logo" className="Dalu-Logo" />
        <div className="Navbar-Login">Search</div>
      </div>
    </div>
  );
}

export default Navbar;
