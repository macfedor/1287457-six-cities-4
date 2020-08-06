import * as React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withOpenFlag from "./with-open-flag";
import {Sort} from "../../components/sort/sort";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponentWrapped = withOpenFlag(Sort);

describe(`Should toggle isOpen state`, () => {
  const wrapper = mount(
      <MockComponentWrapped />
  );

  const item = wrapper.find(`.places__sorting-type`);

  it(`Should isOpen state be truthy after first click`, () => {
    item.simulate(`click`);
    expect(wrapper.state().isOpen).toBeTruthy();
  });

  it(`Should isOpen state be falsy after second click`, () => {
    item.simulate(`click`);
    expect(wrapper.state().isOpen).toBeFalsy();
  });

});
