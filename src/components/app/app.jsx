import React from "react";
import Main from "../main/main.jsx";
import offers from "../../mocks/offers.js";

const App = () => {
  return <Main
    places={offers}
  />;
};

export default App;
