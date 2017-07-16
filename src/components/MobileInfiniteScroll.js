import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  scrollFunc: PropTypes.func.isRequired,
};

class MobileInfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    const { dispatch, scrollFunc } = this.props;
    if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 200)) {
      dispatch(scrollFunc());
    }
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    el.removeEventListener('scroll', this.onScroll, false);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    el.addEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { className, children } = this.props;

    return (
      <div className={ className } ref="scroll">
        { children }
      </div>
    );
  }
}

MobileInfiniteScroll.propTypes = propTypes;

export default MobileInfiniteScroll;