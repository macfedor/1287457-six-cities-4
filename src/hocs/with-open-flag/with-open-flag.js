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

      /*
        хочу сделать тут закрытие селектора по клику где угодно, для этого навешивать/снимать eventListner на document
        но возникла проблема: получаю ошибку this.getState is not a function
        не понимаю, почему. Можешь объяснить в чем причина?

        const isOpened = this.getState().isOpen;
        isOpened ? document.addEventListener(`click`, this._handleOpenChange) : document.removeEventListener(`click`, this._handleOpenChange);

      */
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
