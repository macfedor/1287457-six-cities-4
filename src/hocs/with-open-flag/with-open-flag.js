import React, {PureComponent} from "react";

const withOpenFlag = (Component) => {
  return class OpenFlag extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this._handleOpenChange = this._handleOpenChange.bind(this);
    }

    _handleOpenChange() {
      this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    componentDidUpdate() {
      if (this.state.isOpen) { // линтер ругается на версию с тернарным оператором
        document.addEventListener(`click`, this._handleOpenChange);
      } else {
        document.removeEventListener(`click`, this._handleOpenChange);
      }
    }

    render() {
      return <Component
        {...this.props}
        isOpen={this.state.isOpen}
        onOpenChange={this._handleOpenChange}
      />;
    }
  };
};

export default withOpenFlag;
