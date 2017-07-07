import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MobileNav from '../components/MobileNav';
import Nav from '../components/Nav';

const propTypes = {
  isMobile: PropTypes.bool
};

class NavContainer extends React.Component {
  render() {
    const { isMobile } = this.props;

    if (isMobile) {
      return <MobileNav />
    }

    return <Nav {...this.props } />;
  }
}

NavContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { authed, entities, environment, navigator } = state;
  const { playlists, songs } = entities;
  const { isMobile } = environment;

  return {
    authed,
    authedPlaylists: playlists,
    isMobile,
    navigator,
    songs,
  };
}

export default connect(mapStateToProps)(NavContainer);