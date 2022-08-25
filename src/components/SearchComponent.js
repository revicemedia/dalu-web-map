import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SearchIcon from "../svgs/search_white.svg";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

function SearchComponent({ onSearchSubmit }) {
  const [isCafe, setIsCafe] = useState(false);
  const [isBar, setIsBar] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  function toggleChecked(location) {
    if (location === "restaurant") {
      setIsRestaurant(!isRestaurant);
      console.log("Restaurant");
    } else if (location === "bar") {
      setIsBar(!isBar);
      console.log("Bar");
    } else if (location === "cafe") {
      setIsCafe(!isCafe);
      console.log("Cafe");
    }
  }

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

  function activateSearch(e) {
    e.preventDefault();
    const form = e.target;
    let { search } = form.elements;
    let finalSearch = search.value;
    if (finalSearch !== "") {
      onSearchSubmit(finalSearch);
    } else {
      onSearchSubmit(finalSearch);
    }
  }

  return (
    <SearchWrapper
      active={activeRoute === "Search" || activeRoute.activeRoute === "Search"}
    >
      <form onSubmit={activateSearch}>
        <SearchButtonCluster>
          <CssTextField
            id="search"
            className="InputSearchCustomization"
            placeholder="Suche"
            variant="outlined"
            fullWidth
            size="small"
          />
          <SearchButtonSearch
            type="submit"
            onClick={() => changeNavigationLocation("Map")}
          >
            <img src={SearchIcon} />
          </SearchButtonSearch>
        </SearchButtonCluster>
      </form>
      <FilterSection>
        <h3>Filter</h3>
        <FormControlLabel
          control={<Checkbox onChange={() => toggleChecked("restaurant")} />}
          label="Restaurants"
        />
        <FormControlLabel
          control={<Checkbox onChange={() => toggleChecked("bar")} />}
          label="Bars"
        />
        <FormControlLabel
          control={<Checkbox onChange={() => toggleChecked("cafe")} />}
          label="Cafés"
        />
      </FilterSection>
    </SearchWrapper>
  );
}

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#113042",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#113042",
    },
    "&:hover fieldset": {
      borderColor: "#113042",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#113042",
    },
  },
});

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  padding: 10px 10px 10px 10px;
  overflow: scroll;
  ${({ active }) =>
    !active &&
    `
    display: none;
  `};
`;

const SearchButtonCluster = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`;

// const SearchDeleteButton = styled.div`
//   width: 100%;
//   height: 40px;
//   border-radius: 4px;
//   border: 1px solid #113042;
//   color: #113042;
// `;

const SearchButtonSearch = styled.button`
  all: unset;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #113042;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterSection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default SearchComponent;
