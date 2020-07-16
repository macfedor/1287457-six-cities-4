import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {SortType} from "../../consts.js";
import {ActionCreator} from "../../reducer.js";

class Sort extends PureComponent {

  _renderSortItems() {
    const sortTypes = Object.values(SortType);
    return sortTypes.map((item) => {
      const activeClass = item === this.props.activeSortType ? `places__option--active` : ``;
      return (
        <li
          key={item}
          className={`places__option ${activeClass}`}
          onClick={() => this.props.onSortItemClick(item)}
          onKeyDown={() => this.props.onSortItemClick(item)}
        >{item}</li>
      );
    });
  }

  render() {
    const {activeSortType, isSortOpen, onSortClick} = this.props;
    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => onSortClick()}
        onKeyDown={() => onSortClick()}
        className="places__sorting-type"
        tabIndex="0">
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortOpen ? `places__options--opened` : ``}`}>
        {this._renderSortItems()}
      </ul>
    </form>;
  }
}

const mapStateToProps = (state) => ({
  activeSortType: state.activeSortType,
  isSortOpen: state.isSortOpen,
});

const mapDispatchToProps = (dispatch) => ({
  onSortItemClick(result) {
    dispatch(ActionCreator.changeSortType(result));
  },

  onSortClick() {
    dispatch(ActionCreator.toggleSort());
  }
});

Sort.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onSortItemClick: PropTypes.func.isRequired,
  isSortOpen: PropTypes.bool.isRequired,
  onSortClick: PropTypes.func.isRequired,
};

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
