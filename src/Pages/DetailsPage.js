import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@mui/material/Button";

function DetailsPage({ activeLocation }) {
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

  return (
    <LoginWrapper
      active={
        activeRoute === "Details" || activeRoute.activeRoute === "Details"
      }
    >
      <StyledDetailsImage
        src={
          "https://dalu-api-delivery-service.com/image-uploads/" +
          activeLocation.locationId
        }
        alt="Location"
      ></StyledDetailsImage>
      <StyledDetailsMainWrapper>
        <h3>{activeLocation.locationName}</h3>
        <h5>{activeLocation.locationCity}</h5>
        <br />
        <p>{activeLocation.locationInfoText}</p>
        <br />
        <p>{activeLocation.locationStatus}</p>
        <p>{activeLocation.locationPhone}</p>
        <Button
          variant="outlined"
          onClick={() => changeNavigationLocation("Map")}
        >
          Zurück
        </Button>
      </StyledDetailsMainWrapper>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: scroll;
  ${({ active }) =>
    !active &&
    `
    display: none;
  `};
`;

const StyledDetailsMainWrapper = styled.div`
  padding: 10px 10px 10px 10px;
`;

const StyledDetailsImage = styled.img`
  width: 100%;
  height: auto;
`;

export default DetailsPage;
