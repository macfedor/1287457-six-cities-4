import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "../main/main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should render no results page`, () => {
  const main = mount(<Main places={[]} />);

  const citiesStatus = main.find(`.cities__status`);
  expect(citiesStatus.props().children).toEqual(`No places to stay available`);

});
