import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../svgs/close_white_24dp.svg";

function LocationOverlay({
  activeLocation,
  onCloseLocationOverlay,
  onDetailsButtonClick,
}) {
  let activeRoute = useSelector((state) => state.ACTIVEROUTE.activeRoute);
  const dispatch = useDispatch();

  const changeNavigationLocation = (name) => {
    if (name !== activeRoute && name !== activeRoute.activeRoute) {
      dispatch({
        type: "changeActiveRoute",
        payload: { activeRoute: name },
      });
    } else {
      console.warn("Dieser Tab ist bereits aktiv!");
    }
  };

  function closeLocationOverlay() {
    onCloseLocationOverlay();
  }

  function detailsButtonClick() {
    onDetailsButtonClick(activeLocation);
    changeNavigationLocation("Details");
  }

  return (
    <LocationOverlayWrapper>
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
          <DetailsButton onClick={() => detailsButtonClick(activeLocation)}>
            Details
          </DetailsButton>
        </ContentLocationWrapper>
      </LocationLayoutWrapper>
      <CloseLocationOverlay onClick={() => closeLocationOverlay()}>
        <img src={CloseIcon} alt="Close Location Overlay" />
      </CloseLocationOverlay>
    </LocationOverlayWrapper>
  );
}

const LocationOverlayWrapper = styled.div`
  width: 94vw;
  height: auto;
  z-index: 0;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  padding: 10px 10px;
  border-radius: 10px;
  margin-right: 3vw;
  margin-left: 3vw;
  margin-bottom: 3vw;
  align-self: center;
  justify-self: center;
`;

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
