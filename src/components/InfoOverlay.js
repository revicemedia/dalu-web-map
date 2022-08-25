import CloseImage from "../svgs/close_white_24dp.svg";
import { Link } from "react-router-dom";

function InfoOverlay({ activeLocation, onCloseOverlay }) {
  function closeOverlay() {
    onCloseOverlay();
  }

  const activeLocationImage = `http://dalu-map.com/imageRequest/?id=${activeLocation.id}`;

  return (
    <div className="InfoOverlay">
      <div className="closeOverlay">
        <img
          src={CloseImage}
          alt="Close Info Overlay"
          onClick={() => closeOverlay()}
        />
      </div>
      <div className="ImageWrapper">
        <img src={activeLocationImage} alt="ExampleImage" />
      </div>
      <div className="ContentArea">
        <h4>{activeLocation.title}</h4>
        <div className="BadgeAndDesc">
          <div
            className={
              activeLocation.status === "green"
                ? "Badge BadgeGreen"
                : activeLocation.status === "yellow"
                ? "Badge BadgeYellow"
                : "Badge BadgeRed"
            }
          ></div>
          <p>
            {activeLocation.status === "green"
              ? "Wenig ausgelastet"
              : activeLocation.status === "yellow"
              ? "Stark ausgelastet"
              : "Keine Plätze frei"}
          </p>
        </div>
        <Link
          className="InfoOverlayButton"
          to={"/details/" + activeLocation.id}
        >
          Mehr
        </Link>
      </div>
    </div>
  );
}

export default InfoOverlay;
