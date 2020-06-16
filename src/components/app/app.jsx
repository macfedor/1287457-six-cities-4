import React from "react";
import Main from "../main/main.jsx";

const PLACES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Third name`, `test`];

const App = () => {
  return <Main
    places={PLACES}
    onTitleClick={() => {}}
  />;
};

export default App;
