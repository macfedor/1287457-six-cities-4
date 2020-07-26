import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Header} from "./header.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should sign-in button be clicked`, () => {
  const onSignInClick = jest.fn();

  const header = mount(<Header
    authorizationStatus={`NO_AUTH`}
    userEmail={``}
    onSignInClick={onSignInClick}
  />);

  const signInButton = header.find(`.header__login`);
  signInButton.simulate(`click`, {step: `sign-in`});
  expect(onSignInClick).toHaveBeenCalledTimes(1);
  expect(onSignInClick.mock.calls[0][0].step).toEqual(`sign-in`);
});
