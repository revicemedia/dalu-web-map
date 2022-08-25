import "../index.css";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import RestaurantIcon from "../svgs/restaurant_menu_black_24dp.svg";
import CafeIcon from "../svgs/coffee_black_24dp.svg";
import BarIcon from "../svgs/local_bar_black_24dp.svg";
import styled from "@emotion/styled";

function Map({ markers, loc, center }) {
  const [zoom, setZoom] = useState(12);

  return (
    <div className="MapWrapper">
      <div id="map">
        <div className="OverMap">
          <a className="DashboardButton" href="https://dashboard.dalu-map.com">
            Zum Dashboard
          </a>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAoBsFNDDZL59ZGNy4UCPSjsbmEHNQhRHk" }}
          center={center}
          zoom={zoom}
          gestureHandling={"greedy"}
        >
          {markers.map((marker, index) => (
            <div
              className="MarkerIdee"
              lat={marker.locationLat}
              lng={marker.locationLng}
              text={marker.locationName}
              key={index}
            >
              <div
                className={
                  marker.locationStatus === "green"
                    ? "StatusMarker BadgeGreen"
                    : marker.locationStatus === "yellow"
                    ? "StatusMarker BadgeYellow"
                    : marker.locationStatus === "red"
                    ? "StatusMarker BadgeRed"
                    : ""
                }
              ></div>
              <img
                src={
                  marker.locationType === "restaurant"
                    ? RestaurantIcon
                    : marker.locationType === "cafe"
                    ? CafeIcon
                    : marker.locationType === "bar"
                    ? BarIcon
                    : ""
                }
                alt="Location type icon"
              />
            </div>
          ))}
          {loc ? (
            <div
              className="GeoMarker"
              lat={loc.coords.latitude}
              lng={loc.coords.longitude}
            ></div>
          ) : (
            ""
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}

const MapSearch = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  right: 10px;
  height: 60px;
  z-index: 2000000;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
`;

const SearchButton = styled.button`
  all: unset;
  width: 60px;
  height: 60px;
  background-color: #113042;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInputSearch = styled.input`
  all: unset;
  padding-left: 25px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const StyledInputWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 10px;
  height: 60px;
  background-color: #fff;
`;

const SearchDeleteDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Map;
