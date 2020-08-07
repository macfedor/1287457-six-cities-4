import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {Sort} from "./sort";
import {SortType} from "../../consts";

configure({
  adapter: new Adapter(),
});

it(`Should sort item be clicked`, () => {
  const onSortClick = () => {};
  const onSortItemClick = jest.fn();

  const sort = shallow(
      <Sort
        activeSortType={`Popular`}
        isSortOpen={false}
        onSortItemClick={onSortItemClick}
        onSortClick={onSortClick}
      />
  );

  const sortItem = sort.find(`.places__option`).at(3);
  sortItem.simulate(`click`);

  expect(onSortItemClick).toHaveBeenCalledTimes(1);
  expect(onSortItemClick.mock.calls[0][0]).toBe(SortType.TOP_RATED);
});
