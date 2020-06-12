import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const PLACES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Third name`, `test`];

const init = () => {
  const settings = {
    places: PLACES
  };

  ReactDOM.render(
      <App
        places={settings.places}
      />,
      document.querySelector(`#root`)
  );
};

init();
