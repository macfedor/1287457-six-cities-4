import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import offers from "../../mocks/offers.js";

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      step: `main`,
      activeOffer: null
    };
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTitleClick(result) {
    this.setState({step: `property`, activeOffer: result});
  }

  _renderScreen() {
    const {step, activeOffer} = this.state;

    if (step === `main`) {
      return <Main
        places={offers}
        onTitleClick={this.handleTitleClick}
      />;
    }

    if (step === `property`) {
      return <Property
        property={activeOffer}
        onTitleClick={this.handleTitleClick}
      />;
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-offer">
            <Property
              property={offers[0]}
              onTitleClick={this.handleTitleClick}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
