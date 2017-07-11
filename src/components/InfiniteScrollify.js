import React from 'react';
import PropTypes from 'prop-types';

export default function (InnerComponent) {
  class InfiniteScrollComponent extends React.Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
        const { dispatch, scrollFunc } = this.props;
        dispatch(scrollFunc());
      }
    }

    componentWillUnmount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    render() {
      return <InnerComponent {...this.props } />
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }
  }

  InfiniteScrollComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    scrollFunc: PropTypes.func.isRequired,
  };

  return InfiniteScrollComponent;
}