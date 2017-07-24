import * as types from '../constants/ActionTypes';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import merge from 'lodash/merge';

const LIKES_PLAYLIST_KEY = `likes${AUTHED_PLAYLIST_SUFFIX}`;
const STREAM_PLAYLIST_KEY = `stream${AUTHED_PLAYLIST_SUFFIX}`;
const initialPlaylistState = {
  isFetching: false,
  items: [],
  futureUrl: false,
  nextUrl: false
};

function playlist(state = initialPlaylistState, action) {
  switch (action.type) {

    case types.REQUEST_SONGS:
      return Object.assign({}, state, {
        isFetching: true,
        nextUrl: null,
      });

    case types.RECEIVE_SONGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [...state.items, ...action.songs],
        futureUrl: action.futureUrl,
        nextUrl: action.nextUrl,
      });

    case types.APPEND_LIKE:
      return Object.assign({}, state, {
        items: [action.songId, ...state.items],
      });


    case types.RECEIVE_NEW_STREAM_SONGS:
      return Object.assign({}, state, {
        futureUrl: action.futureUrl,
      });

    case types.REMOVE_UNLIKED_SONGS:
      return Object.assign({}, state, {
        items: [...action.songs],
      });

    case types.UNSHIFT_NEW_STREAM_SONGS:
      return Object.assign({}, state, {
        items: [...state.items, ...action.songs],
      });

    default:
      return state;
  }
}

const initialState = {
  [LIKES_PLAYLIST_KEY]  : { isFetching: false, items: [], nextUrl: null },
  [STREAM_PLAYLIST_KEY] : { isFetching: false, items: [], nextUrl: null }
};

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_SONGS:
      return Object.assign({}, state, {
        [action.playlist]: playlist(state[action.playlist], action),
      });

    case types.RECEIVE_SONGS:
      return Object.assign({}, state, {
        [action.playlist]: playlist(state[action.playlist], action),
      });

    case types.APPEND_LIKE:
      return Object.assign({}, state, {
        [LIKES_PLAYLIST_KEY]: playlist(state[LIKES_PLAYLIST_KEY], action),
      });

    case types.RECEIVE_NEW_STREAM_SONGS:
      return Object.assign({}, state, {
        [STREAM_PLAYLIST_KEY]: playlist(state[STREAM_PLAYLIST_KEY], action),
      });

    case types.REMOVE_UNLIKED_SONGS:
      return Object.assign({}, state, {
        [LIKES_PLAYLIST_KEY]: playlist(state[LIKES_PLAYLIST_KEY], action),
      });

    case types.RESET_AUTHED:
      const resetedPlaylist = [...action.playlists, STREAM_PLAYLIST_KEY, LIKES_PLAYLIST_KEY];
      const newState = resetedPlaylist
        .reduce((obj, p) => merge({}, obj, { [p]: initialPlaylistState }), {});
      return Object.assign({}, state, newState);

    case types.UNSHIFT_NEW_STREAM_SONGS:
      return Object.assign({}, state, {
        [STREAM_PLAYLIST_KEY]: playlist(state[STREAM_PLAYLIST_KEY], action),
      });

    default:
      return state;
  }
}

