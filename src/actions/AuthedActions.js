import { arrayOf, normalize } from 'normalizr';
import SC from 'soundcloud';
import Cookies from 'js-cookie';
import { navigateTo } from '../actions/NavigatorActions';
import * as types from '../constants/ActionTypes';
import { CLIENT_ID } from '../constants/Config';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { playlistSchema, songSchema, userSchema } from '../constants/Schemas';

const COOKIE_PATH = 'accessToken';
let streamInterval;

function authUser(accessToken, shouldShowStream = true) {
  return dispatch =>
    dispatch(fetchAuthedUser(accessToken, shouldShowStream));
}

function fetchAuthedUser(accessToken, shouldShowStream) {
  return dispatch =>
    fetch(`//api.soundcloud.com/me?oauth_token=${ accessToken }`)
      .then(response => response.json())
      .then(json => dispatch(receiveAuthedUserPre(accessToken, json, shouldShowStream)))
      .catch(error => { throw error; })
}

// action creator
function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVE_ACCESS_TOKEN,
    accessToken
  };
}
// action creator
function receiveAuthedUser(user) {
  return {
    type: types.RECEIVE_AUTHED_USER,
    user,
  };
}
// action creator
function receiveLikes(likes) {
  return {
    type: types.RECEIVE_LIKES,
    likes,
  };
}
// action creator
function receiveSongs(entities, songs, playlist, nextUrl, futureUrl) {
  return {
    type: types.RECEIVE_SONGS,
    entities,
    songs,
    playlist,
    nextUrl,
    futureUrl,
  };
}
// action creator
function receiveAuthedPlaylists(playlists, entities) {
  return {
    type: types.RECEIVE_AUTHED_PLAYLISTS,
    playlists,
    entities,
  };
}


function fetchLikes(accessToken) {
  return dispatch =>
    fetch(`//api.soundcloud.com/me/favorites?oauth_token=${accessToken}`)
      .then(response => response.json())
      .then(json => {
        const songs = json.filter(song => song.streamable);
        const normalized = normalize(songs, arrayof(songSchema));
        const likes = normalized.result.reduce((obj, songId) => Object.assign({}, obj, { [songId]: 1 }), {});

        // dispatch receive likes, songs
        dispatch(receiveLikes(likes));
        dispatch(receiveSongs(
          normalized.entities,
          normalized.result,
          `likes${AUTHED_PLAYLIST_SUFFIX}`,
          null
        ));

      })
      .catch(err => { throw err; });
}

function fetchPlaylists(accessToken) {
  return dispatch =>
    fetch(`//api.soundcloud.com/me/playlists?oauth_token=${accessToken}`)
      .then(response => response.json())
      .then(json => {
        const normalized = normalize(json, arrayOf(playlistSchema));

        dispatch(receiveAuthedPlaylists(normalized.result, normalized.entities));

        normalized.result.forEach(playlistId => {
          const playlist = normalized.entities.playlists[playlistId];

          dispatch(receiveSongs(
            {},
            playlist.tracks,
            playlist.title + AUTHED_PLAYLIST_SUFFIX,
            null
          ));
        })
      })
      .catch(err => { throw err; });
}

// action creator
function requestSongs(playlist) {
  return {
    type: types.REQUEST_SONGS,
    playlist
  };
}

// action creator
function receiveNewStreamSongs(futureUrl, entities, songs) {
  return {
    type: types.RECEIVE_NEW_STREAM_SONGS,
    entities,
    futureUrl,
    songs,
  }
}

function fetchNewStreamSongs(url, accessToken) {
  return (dispatch, getState) => {
    const { authed, playlists } = getState();

    const streamSongsMap = playlists[`stream${AUTHED_PLAYLIST_SUFFIX}`].items
      .reduce((obj, songId) => Object.assign({}, obj, { [songId]: 1 }), {});
    const newStreamSongsMap = authed.newStreamSongs
      .reduce((obj, songId) => Object.assign({}, obj, { [songId]: 1 }), {});

    return fetch(url)
      .then(response => response.json())
      .then(json => {

      })
      .then(data => {
        const normalized = normalize(data.collection, arrayOf(songSchema));
        dispatch(receiveNewStreamSongs(data.futureUrl, normalized.entities, normalized.result));
      })
      .catch(err => { throw err; });
  };
}

function initInterval(accessToken) {
  return (dispatch, getState) => {
    streamInterval = setInternal(() => {
      const playlistKey = `stream${AUTHED_PLAYLIST_SUFFIX}`;
      const { playlists } = getState();
      const streamPlaylist = playlists[playlistKey];

      if (streamPlaylist.futureUrl) {
        dipatch(fetchNewStreamSongs(streamPlaylist.futureUrl, accessToken));
      } else {
        clearInterval(streamInterval);
      }
    }, 6000);
  };
}

function fetchSongs(url, playlist) {
  return (dispatch, getState) => {
    const { authed } = getState();

    // dispatch requestSongs
    dispatch(requestSongs(playlist));

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        let nextUrl = null;
        let futureUrl = null;

        if (json.next_href) {
          nextUrl = json.next_href;
          nextUrl += (authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
        }
        if (json.future_url) {
          futureUrl = json.future_url;
          futureUrl += (authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
        }

        const songs = json.collections
          .map(song => song.origin || song)
          .filter(song => {
            // if (playlist in GEN)
          })


      })
      .catch(err => { throw err; });
  };
}

function fetchStream(accessToken) {
  return dispatch => {
    dispatch(initInterval(accessToken));
    dispatch(fetchSongs(
      `//api.soundcloud.com/me/activities/tracks/affiliated?limit=50&oauth_token=${accessToken}`,
      `stream${AUTHED_PLAYLIST_SUFFIX}`
    ))
  };
}

function fetchFollowings(accessToken) {

}

function receiveAuthedUserPre(accessToken, user, shouldShowStream) {
  return dispatch => {
    dispatch(receiveAccessToken(accessToken));
    dispatch(receiveAuthedUser(user));
    dispatch(fetchLikes(accessToken));
    dispatch(fetchPlaylists(accessToken));
    dispatch(fetchStream(accessToken));
    dispatch(fetchFollowings(accessToken));
    if (shouldShowStream) {
      dispatch(navigateTo({path: ['me', 'stream']}));
    }
  };
}



export function initAuth() {

}

export function loginUser(shouldShowStream = true) {
  return dispatch => {
    const accessToken = Cookies.get(COOKIE_PATH);
    if (accessToken) {
      return dispatch(authUser(accessToken, false));
    }
    return null;
  }
}

export function logoutUser() {

}

export function addNewStreamSongsToPlaylist() {

}

export function toggleFollow(userId) {

}

export function toggleLike(songId) {

}