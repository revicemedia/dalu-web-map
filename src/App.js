import "./App.css";
import "./index.css";
import styled from "styled-components";
import Map from "./components/Map";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllLocations } from "./functions/getLocations.js";
import { nanoid } from "nanoid";
import LocationOverlay from "./components/LocationOverlay";
import DetailsPage from "./Pages/DetailsPage";

function App() {
  const [locationOverlayOpen, setLocationOverlayOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 50.3463816,
    lng: 7.5185153,
  });
  let activeRoute = useSelector((state) => state.ACTIVEROUTE.activeRoute);

  console.log(nanoid());

  useEffect(() => {
    getAllLocations().then((data) => {
      setMarkers(data);
    });
  }, []);

  // Called inside MapTest.js
  function onMarkerClick(marker) {
    setCenter({
      lat: Number(marker.locationLat),
      lng: Number(marker.locationLng),
    });
    openLocationOverlay(marker);
  }

  function openLocationOverlay(marker) {
    setLocationOverlayOpen(true);
    setActiveLocation(marker);
  }

  function onCloseLocationOverlay() {
    setLocationOverlayOpen(false);
    setActiveLocation([]);
  }

  function onDetailsButtonClick() {
    console.log(activeLocation);
  }

  return (
    <div className="root-wrapper">
      <MainWrapper>
        <MapWrapper
          active={activeRoute === "Map" || activeRoute.activeRoute === "Map"}
        >
          <Map
            markers={markers}
            center={center}
            onMarkerClick={onMarkerClick}
          ></Map>
          {locationOverlayOpen && (
            <LocationOverlay
              activeLocation={activeLocation}
              onCloseLocationOverlay={onCloseLocationOverlay}
              onDetailsButtonClick={onDetailsButtonClick}
            />
          )}
        </MapWrapper>
        <DetailsPage activeLocation={activeLocation} />
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
