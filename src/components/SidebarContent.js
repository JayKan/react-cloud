import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
};

class SidebarContent extends React.Component {
  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  handleMouseEnter() {
    document.body.style.overflow = 'hidden';
  }

  handleMouseLeave() {
    document.body.style.overflow = 'auto';
  }

  render() {
    const { children, className, height } = this.props;

    return (
      <div
        className={`sidebar-content ${String(className)}`}
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        style={{ maxHeight: height }}
      >
        { children }
      </div>
    );
  }
}

SidebarContent.propTypes = propTypes;

export default SidebarContent;