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
            <p className="LocationOverlayWrapper-Headline">
              {activeLocation.locationName}
            </p>
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
                <StatusTextOverlay>Keine freien Plätze</StatusTextOverlay>
              </StatusWrapper>
            )}
            <DetailsButton onClick={() => console.log(activeLocation)}>
              Mehr erfahren
            </DetailsButton>
          </ContentLocationWrapper>
          <CloseLocationOverlay onClick={() => closeLocationOverlay()}>
            <img
              width="30px"
              height="30px"
              src={CloseIcon}
              alt="Close Location Overlay"
            />
          </CloseLocationOverlay>
        </LocationLayoutWrapper>
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
  font-weight: 400;
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
  grid-template-columns: 1.2fr 2fr auto;
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
  /* background-color: #3d3d3d; */
  color: #3d3d3d;
  font-weight: 300;
  /* padding: 10px 20px; */
  /* border-radius: 5px; */
  font-size: 0.8rem;
  width: fit-content;
  border-bottom: 1px solid #3d3d3d;
`;

const CloseLocationOverlay = styled.div`
  width: auto;
  height: auto;
  display: block;
`;

export default LocationOverlay;
