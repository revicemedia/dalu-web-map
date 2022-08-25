import "../index.css";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Impressum() {
  let activeRoute = useSelector((state) => state.ACTIVEROUTE.activeRoute);

  return (
    <ImpressumWrapper
      active={
        activeRoute === "Impressum" || activeRoute.activeRoute === "Impressum"
      }
    >
      <ImpressumHeadline>Impressum</ImpressumHeadline>
      <p>DaLu Services GbR</p>
      <p>Am Ringofen 8</p>
      <p>56566 Neuwied</p>
      <br />
      <p>Vertreten durch:</p>
      <p>Danny Kowalczuk</p>
      <p>Luca Torres Neuer</p>
      <br />
      <br />
      <p>Umgesetzt durch:</p>
      <p>Revice Media</p>
      <p>Fabian Hanso</p>
    </ImpressumWrapper>
  );
}

const ImpressumWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  padding: 30px 10px 10px 10px;
  text-align: center;
  overflow: scroll;
  ${({ active }) =>
    !active &&
    `
    display: none;
  `};
`;

const ImpressumHeadline = styled.h3`
  margin-bottom: 20px;
`;

export default Impressum;
