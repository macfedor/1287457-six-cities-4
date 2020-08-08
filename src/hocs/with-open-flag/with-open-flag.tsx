import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isOpen: boolean;
}

interface InjectingProps {
  onOpenChange: () => void;
}

const withOpenFlag = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;
  return class OpenFlag extends React.PureComponent<T, State> {
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
