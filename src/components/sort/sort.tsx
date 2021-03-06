import * as React from "react";
import {connect} from "react-redux";
import {SortType} from "../../consts";
import {ActionCreator} from "../../reducer/data/data";
import {getActiveSortType} from "../../reducer/data/selectors";

interface Props {
  activeSortType: string;
  onSortItemClick: (item: string) => void;
  isOpen: boolean;
  onOpenChange: () => void;
}

class Sort extends React.PureComponent<Props, Record<string, unknown>> {
  constructor(props) {
    super(props);
  }

  _renderSortItems() {
    const sortTypes = Object.values(SortType);
    return sortTypes.map((item, index) => {
      const activeClass = item === this.props.activeSortType ? `places__option--active` : ``;
      return (
        <li
          key={index}
          className={`places__option ${activeClass}`}
          onClick={(evt) => this.props.onSortItemClick((evt.target as Element).innerHTML)}
          onKeyDown={(evt) => this.props.onSortItemClick((evt.target as Element).innerHTML)}
        >{item}</li>
      );
    });
  }

  render() {
    const {activeSortType, isOpen, onOpenChange} = this.props;
    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => onOpenChange()}
        onKeyDown={() => onOpenChange()}
        className="places__sorting-type"
        tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
        {this._renderSortItems()}
      </ul>
    </form>;
  }
}

const mapStateToProps = (state) => ({
  activeSortType: getActiveSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortItemClick(result) {
    dispatch(ActionCreator.changeSortType(result));
  },
});

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
