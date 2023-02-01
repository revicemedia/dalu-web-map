import "../index.css";
import styled from "styled-components";
import CloseIcon from "../svgs/close_white_24dp.svg";
import "./LocationOverlay.css";

function LocationOverlay({
  activeLocation,
  onCloseLocationOverlay,
  onDetailsButtonClick,
}) {
  function closeLocationOverlay() {
    onCloseLocationOverlay();
  }

  return (
    <div className="flex-center-Overlay">
      <div className="LocationOverlayWrapper">
        <LocationLayoutWrapper>
          <LocationImage
            src={
              "https://dalu-api-delivery-service.com/image-uploads/" +
              activeLocation.locationId +
              ".jpg"
            }
          />
          <ContentLocationWrapper>
            <h4>{activeLocation.locationName}</h4>
            {activeLocation.locationStatus === "green" ? (
              <StatusWrapper>
                <GreenDot />
                <StatusTextOverlay>Wenig ausgelastet</StatusTextOverlay>
              </StatusWrapper>
            ) : activeLocation.locationStatus === "yellow" ? (
              <StatusWrapper>
                <YellowDot />
                <StatusTextOverlay>Stark ausgelastet</StatusTextOverlay>
              </StatusWrapper>
            ) : (
              <StatusWrapper>
                <RedDot />
                <StatusTextOverlay>Keien freien Plätze</StatusTextOverlay>
              </StatusWrapper>
            )}
            <DetailsButton onClick={() => console.log(activeLocation)}>
              Details
            </DetailsButton>
          </ContentLocationWrapper>
        </LocationLayoutWrapper>
        <CloseLocationOverlay onClick={() => closeLocationOverlay()}>
          <img src={CloseIcon} alt="Close Location Overlay" />
        </CloseLocationOverlay>
      </div>
    </div>
  );
}

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StatusTextOverlay = styled.p`
  font-size: 0.8rem;
`;

const GreenDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  margin-right: 10px;
`;

const YellowDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: yellow;
  margin-right: 10px;
`;

const RedDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-right: 10px;
`;

const LocationLayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 10px;
  width: 100%;
  height: auto;
`;

const LocationImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  min-height: 100px;
  max-height: 100px;
  border-radius: 5px;
  overflow: hidden;
`;

const ContentLocationWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailsButton = styled.div`
  background-color: #3d3d3d;
  color: #fff;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.8rem;
  width: fit-content;
`;

const CloseLocationOverlay = styled.div`
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -35px;
  right: 0px;
`;

export default LocationOverlay;
