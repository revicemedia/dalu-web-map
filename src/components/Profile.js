import "../index.css";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import TrafficIcon from "@mui/icons-material/Traffic";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

function ProfileComponent({ userIsLoggedIn, onLogoutButtonClick, activeUser }) {
  let activeRoute = useSelector((state) => state.ACTIVEROUTE.activeRoute);
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

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

  function logoutButtonClick() {
    onLogoutButtonClick();
  }

  return (
    <ProfileWrapper
      active={
        activeRoute === "Profile" || activeRoute.activeRoute === "Profile"
      }
    >
      <ProfileFlexTopWrapper>
        {activeUser ? (
          <Avatar
            {...stringAvatar(
              activeUser.userFirstName + " " + activeUser.userLastName
            )}
          />
        ) : (
          <Avatar {...stringAvatar("Nicht angemeldet")} />
        )}

        <FullNameParagraph>
          {activeUser
            ? activeUser.userFirstName + " " + activeUser.userLastName
            : "Nicht angemeldet"}
        </FullNameParagraph>
      </ProfileFlexTopWrapper>
      <ProfileNavigationWrapper>
        <List>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Einstellungen" />
          </ListItemButton>
          {/* 2. */}
          {activeUser && activeUser.userIsAdmin && (
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <TrafficIcon />
              </ListItemIcon>
              <ListItemText primary="Status updaten" />
            </ListItemButton>
          )}
          {/* 4. */}
          {activeUser && activeUser.userIsManager && (
            <ListItemButton
              component="a"
              onClick={() => changeNavigationLocation("addLocation")}
            >
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Location hinzufügen" />
            </ListItemButton>
          )}
          {activeUser && activeUser.userIsAdmin && (
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <MailOutlineOutlinedIcon />
                <TheBadge>
                  <BadgeText>3</BadgeText>
                </TheBadge>
              </ListItemIcon>
              {/* <Badge
                badgeContent={4}
                color="primary"
                className="extraSpaceBadge"
              >
                <MailIcon color="action" />
              </Badge> */}
              <ListItemText primary="Postfach" />
            </ListItemButton>
          )}
          {/* 5. */}
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <FeedbackOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItemButton>
          {/* 6. */}
          <ListItemButton
            component="a"
            onClick={() => changeNavigationLocation("Impressum")}
          >
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Impressum" />
          </ListItemButton>
          {/* 7. */}
          {userIsLoggedIn && (
            <ListItemButton component="a" onClick={logoutButtonClick}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Abmelden" />
            </ListItemButton>
          )}
          {/* 8. */}
          {!userIsLoggedIn && (
            <ListItemButton
              component="a"
              onClick={() => changeNavigationLocation("Login")}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Anmelden" />
            </ListItemButton>
          )}
        </List>
      </ProfileNavigationWrapper>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  padding: 10px 10px;
  overflow: scroll;
  ${({ active }) =>
    !active &&
    `
    display: none;
  `};
`;

const ProfileFlexTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FullNameParagraph = styled.p`
  padding-top: 10px;
`;

const ProfileNavigationWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const TheBadge = styled.div`
  left: 32px;
  width: 12px;
  height: 12px;
  background-color: #082640;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgeText = styled.p`
  font-size: 0.5rem;
  font-weight: 600;
  color: #fff;
`;

export default ProfileComponent;
