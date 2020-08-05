import * as React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Sort} from "./sort";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render Sort`, () => {
  const store = mockStore({
    activeSortType: `Popular`,
    isSortOpen: false,
  });

  const tree = renderer
    .create(<Provider store={store}>
      <Sort
        activeSortType={`Popular`}
        isSortOpen={false}
        onSortItemClick={() => {}}
        onSortClick={() => {}}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
