import React from 'react';
import PropTypes from 'prop-types';
import { Motion, presets, spring } from 'react-motion';
import Link from './Link';
import { GENRES } from '../constants/SongConstants';
import { getImageUrl } from '../utils/SongUtils';
import { loginUser, logoutUser } from '../actions/AuthedActions';

const propTypes = {
  authed: PropTypes.object.isRequired,
  authedPlaylists: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

class MobileNav extends React.Component {
  constructor() {
    super();

  }

  toggleGenreMenuOpen(e) {

  }

  toggleUserMenuOpen(e) {

  }

  login(e) {

  }

  logout(e) {

  }

  getPlaylistDetails() {

  }

  renderUserOptions() {

  }

  renderGenreMenu(isGenreMenuOpen, playlist) {

  }

  renderUserMenu(isUserMenuOpen, playlist, getPlaylistDetails) {

  }

  renderGenresOptions(isGenreMenuOpen, playlist) {

  }

  renderGenresTabs(playlist) {

  }

  renderUserTabs(tabs) {

  }

  renderPlaylist() {

  }

  render() {

  }
}

MobileNav.propTypes = propTypes;

export default MobileNav;