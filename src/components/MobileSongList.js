import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import MobileSongListItem from './MobileSongListItem';
import MobileInfiniteScroll from './MobileInfiniteScroll';
import { fetchSongsIfNeeded } from '../actions/PlaylistsActions';
import { playSong } from '../actions/PlayerActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class MobileSongList extends React.Component {
  playSong(playlist, i, e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(playSong(playlist, i));
  }

  renderSongsListItems() {
    const { playSongId, playlist, playlists, songs, users } = this.props;
    if (!(playlist in playlists)) {
      return null;
    }

    return playlists[playlist].items.map((songId, i) => {
      const song = songs[songId];
      const user = users[song.user_id];
      const playSongFunc = this.playSong.bind(this, playlist, i);
      return (
        <MobileSongListItem
          key={`${songId}-${i}`}
          isActive={ song.id === playSongId }
          playSong={ playSongFunc }
          song={ song }
          user={ user }
        />
      );
    });
  }

  renderSpinner() {
    const { playlist, playlists } = this.props;
    if (!(playlist in playlists) || playlists[playlist].isFetching) {
      return <Spinner />;
    }

    return null;
  }

  render() {
    const { dispatch, playlist } = this.props;
    return (
      <MobileInfiniteScroll
        className="mobile-songs"
        dispatch={ dispatch }
        scrollFunc={ fetchSongsIfNeeded.bind(null, playlist) }
      >
        { this.renderSongsListItems() }
        { this.renderSpinner() }
      </MobileInfiniteScroll>
    );
  }
}

MobileSongList.propTypes = propTypes;

export default MobileSongList;