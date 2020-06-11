import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const init = () => {
  const settings = {
    placesCount: 222,
  };

  ReactDOM.render(
      <App
        placesCount={settings.placesCount}
      />,
      document.querySelector(`#root`)
  );
};

init();
