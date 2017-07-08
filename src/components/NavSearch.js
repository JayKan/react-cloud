import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { navigateTo } from '../actions/NavigatorActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class NavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleSlashPress = this.handleSlashPress.bind(this);
  }

  handleOnKeyPress(e) {
    if (e.charCode === 13) {
      const { dispatch } = this.props;
      const value = e.currentTarget.value.trim();
      if (value !== '') {
        dispatch(navigateTo({ path: ['songs'], query: { q: value } }));
      }
    }
  }

  handleSlashPress(e) {
    const keyCode = e.keyCode || e.which;
    const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);

    if (keyCode === 47 && !isInsideInput) {
      e.preventDefault();
      ReactDOM.findDOMNode(this.refs.query).focus();
    }
  }

  // current method is called before the `render` method is executed
  componentWillMount() {
    document.removeEventListener('keypress', this.handleSlashPress, false);
  }

  render() {
    return (
      <div className="nav-search">
        <i className="icon ion-search" />
        <input
          type="text"
          className="nav-search-input"
          placeholder="SEARCH"
          ref="query"
          onKeyPress={ this.handleOnKeyPress }
        />
      </div>
    );
  }

  // current method is called right after the `render` method has been executed
  componentDidMount() {
    document.addEventListener('keypress', this.handleSlashPress, false);
  }
}

NavSearch.propTypes = propTypes;

export default NavSearch;