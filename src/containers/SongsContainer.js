import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MobileSongs from '../components/MobileSongs';
import Songs from '../components/Songs';
import { fetchSongsIfNeeded } from '../actions/PlaylistsActions';
import { getPlayingSongId } from '../utils/PlayerUtils';

const propTypes = {
  isMobile: PropTypes.bool,
};

class SongsContainer extends React.Component {
  render() {
    const { isMobile } = this.props;
    if (isMobile) {
      return <MobileSongs { ...this.props } />
    }

    return <Songs { ...this.props } />;
  }
}

SongsContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { authed, entities, environment, navigator, player, playlists } = state;
  const { height, isMobile } = environment;
  const { songs, users } = entities;
  const { query } = navigator.route;
  const playingSongId = getPlayingSongId(player, playlists);

  const time = query && query.t ? query.t : null;
  let playlist = query && query.q ? query.q : 'chill';
  if (time) {
    playlist = `${playlist} - ${time}`;
  }

  return {
    authed,
    height,
    isMobile,
    playingSongId,
    playlist,
    playlists,
    scrollFunc: fetchSongsIfNeeded.bind(null, playlist),
    songs,
    time,
    users,
  };
}

export default connect(mapStateToProps)(SongsContainer);