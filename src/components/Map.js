import "../index.css";
import React from "react";
import GoogleMapReact from "google-map-react";
import RestaurantIcon from "../svgs/restaurant_menu_black_24dp.svg";
import CafeIcon from "../svgs/coffee_black_24dp.svg";
import BarIcon from "../svgs/local_bar_black_24dp.svg";

function Map({ markers, loc, center, onHandleMarkerClick }) {
  const zoom = 12;

  const handleMarkerClick = (marker) => {
    onHandleMarkerClick(marker);
  };

  return (
    <>
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAoBsFNDDZL59ZGNy4UCPSjsbmEHNQhRHk" }}
          center={center}
          zoom={zoom}
          gestureHandling="greedy"
        >
          {markers.map((marker, index) => (
            <div
              className="MarkerIdee"
              lat={marker.locationLat}
              lng={marker.locationLng}
              text={marker.locationName}
              key={index}
              onClick={() => handleMarkerClick(marker)}
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
    </>
  );
}

export default Map;
