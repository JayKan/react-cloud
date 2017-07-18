import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isOn: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
};

class Switch extends React.Component {
  render() {
    const { isOn, toggleFunc } = this.props;

    return (
      <div
        className={`switch ${(isOn ? 'on' : '')}`}
        onClick={ toggleFunc }
      >
        <div className="switch-button" />
      </div>
    );
  }
}

Switch.propTypes = propTypes;

export default Switch;