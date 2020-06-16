import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`MainComponent`, () => {
  it(`Should place's title be pressed`, () => {
    const onTitleClick = jest.fn();

    const main = shallow(
        <Main
          places={[`Beautiful & luxurious apartment at great location`]}
          onTitleClick={onTitleClick}
        />
    );

    const placeTitle = main.find(`.place-card__name a`);

    placeTitle.simulate(`click`);

    expect(onTitleClick).toHaveBeenCalledTimes(1);
  });
});
