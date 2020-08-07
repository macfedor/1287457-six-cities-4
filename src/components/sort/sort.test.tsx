import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Sort} from "./sort";
import configureStore from "redux-mock-store";
import {noop} from "../../utils/common";

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
        isOpen={false}
        onSortItemClick={noop}
        onOpenChange={noop}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
