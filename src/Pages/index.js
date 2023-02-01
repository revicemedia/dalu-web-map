import "../App.css";
import "../index.css";
import styled from "styled-components";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import { getAllLocations } from "../functions/getLocations.js";
import LocationOverlay from "../components/LocationOverlay";
import Navbar from "../components/Navbar/Navbar";

function Index() {
  const [locationOverlayOpen, setLocationOverlayOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 50.3463816,
    lng: 7.5185153,
  });

  const hi = {
    test: 123,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("No location found");
    }

    async function showPosition(position) {
      const test = {
        hello: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      };

      Object.assign(hi, test);

      console.log(hi);
    }
  });

  useEffect(() => {
    getAllLocations().then((data) => {
      setMarkers(data);
    });
  }, []);

  function onCloseLocationOverlay() {
    setLocationOverlayOpen(false);
    setActiveLocation([]);
  }

  function onDetailsButtonClick() {
    console.log(activeLocation);
  }

  const onHandleMarkerClick = (marker) => {
    setLocationOverlayOpen(true);
    setActiveLocation(marker);
    console.log(marker);
    setCenter({
      lat: Number(marker.locationLat),
      lng: Number(marker.locationLng),
    });
  };

  return (
    <div className="wrapper">
      <MainWrapper>
        <Navbar />
        <Map
          markers={markers}
          center={center}
          onHandleMarkerClick={onHandleMarkerClick}
        ></Map>
        {locationOverlayOpen && (
          <LocationOverlay
            activeLocation={activeLocation}
            onCloseLocationOverlay={onCloseLocationOverlay}
            onDetailsButtonClick={onDetailsButtonClick}
          />
        )}
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: fixed;
`;

export default Index;
