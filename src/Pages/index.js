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
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("No location found");
    }

    async function showPosition(position) {
      const userLocation = {
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      };

      if (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(14);
      }

      console.log(userLocation);
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
    setZoom(12);
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
    setZoom(14);
  };

  return (
    <div className="wrapper">
      <MainWrapper>
        <Navbar />
        <Map
          markers={markers}
          center={center}
          onHandleMarkerClick={onHandleMarkerClick}
          zoom={zoom}
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
