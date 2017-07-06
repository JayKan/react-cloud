import * as types from '../constants/ActionTypes';

const initialState = {
  accessToken: null,
  followings: {},
  likes: {},
  newStreamSongs: [],
  playlists: [],
  user: null
};

export default function authed(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      });

    default:
      return state;
  }
}