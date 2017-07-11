import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initAuth } from '../actions/AuthedActions';
import { initEnvironment } from '../actions/EnvironmentActions';
import { initNavigator } from '../actions/NavigatorActions';

import NavContainer from './NavContainer';
import MeContainer from './MeContainer';
import ModalContainer from './ModalContainer';
import PlayerContainer from './PlayerContainer';
import SongContainer from './SongContainer';
import SongsContainer from './SongsContainer';
import UserContainer from './UserContainer';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  path: PropTypes.array.isRequired,
  width: PropTypes.number,
};

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initAuth());
    dispatch(initEnvironment());
    dispatch(initNavigator());
  }

  renderContent() {
    const { path } = this.props;

    switch (path[0]) {
      case 'songs':
        switch (path.length) {
          case 1:
            return <SongsContainer />;
          case 2 :
            return <SongContainer />;
          default:
            return null;
        }
      case 'users':
        return <UserContainer />;
      case 'me':
        return <MeContainer />;
      default:
        return null;
    }
  }

  render() {
    const { height, isMobile, width } = this.props;
    // console.log('isMobile: ', isMobile);
    // console.log('height: ', height);
    // console.log('width: ', width);
    if (isMobile) {

    }

    return (
      <div>
        <NavContainer />
        { this.renderContent() }

      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const { environment, navigator } = state;
  const { height, isMobile, width } = environment;
  const { path } = navigator.route;

  return {
    height,
    isMobile,
    path,
    width,
  };
}

export default connect(mapStateToProps)(App);