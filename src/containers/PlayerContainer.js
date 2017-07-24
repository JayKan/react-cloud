import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MobilePlayer from '../components/MobilePlayer';
import Player from '../components/Player';
import { getPlayingSongId } from '../utils/PlayerUtils';

const propTypes = {
  isMobile: PropTypes.bool,
  playingSongId: PropTypes.number,
};

class PlayerContainer extends React.Component {
  render() {
    const { isMobile, playingSongId } = this.props;
    if (isMobile) {
      return <MobilePlayer { ...this.props } />;
    }

    if (playingSongId === null) {
      return <div />;
    }

    return <Player { ...this.props } />
  }
}

PlayerContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities, environment, player, playlists } = state;
  const { isMobile } = environment;
  const { songs, users } = entities;
  const playingSongId = getPlayingSongId(player, playlists);

  return {
    isMobile,
    player,
    playingSongId,
    songs,
    users,
    playlists,
  };
}

export default connect(mapStateToProps)(PlayerContainer);