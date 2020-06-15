import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const placeTitleHandler = () => {};

const App = (props) => {
  const {places} = props;

  return <Main
    places={places}
    onTitleClick={placeTitleHandler}
  />;
};

App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
