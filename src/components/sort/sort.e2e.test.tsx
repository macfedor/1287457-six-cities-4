import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {Sort} from "./sort";
import {SortType} from "../../consts";
import {noop} from "../../utils/common";

configure({
  adapter: new Adapter(),
});

it(`Should sort item be clicked`, () => {
  const onSortItemClick = jest.fn();

  const sort = mount(
      <Sort
        activeSortType={`Popular`}
        isOpen={false}
        onSortItemClick={onSortItemClick}
        onOpenChange={noop}
      />
  );

  const sortItem = sort.find(`.places__option`).at(3);
  sortItem.simulate(`click`);

  expect(onSortItemClick).toHaveBeenCalledTimes(1);
  expect(onSortItemClick.mock.calls[0][0]).toBe(SortType.TOP_RATED);
});
