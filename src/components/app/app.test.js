import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {App} from "./app.jsx";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

it(`Render App`, () => {
  const store = mockStore({
    step: `main`,
  });

  const tree = renderer
    .create(<Provider store={store}>
      <App
        step={`main`}
        activeCity={`Paris`}
        cities={[`Paris`, `Amsterdam`]}
        onTitleClick={() => {}}
        onCityClick={() => {}}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
