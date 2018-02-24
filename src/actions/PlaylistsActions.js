import { arrayOf, normalize } from 'normalizr';
import { changePlayingSong } from '../actions/PlayerActions';
import * as types from '../constants/ActionTypes';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import { GENRES_MAP } from '../constants/SongConstants';
import { getPlayingPlaylist } from '../utils/PlayerUtils';
import { constructUrl } from '../utils/SongUtils';

const removeUnlikedSongs = songs => ({
  type: types.REMOVE_UNLIKED_SONGS,
  songs
});

const requestSongs = playlist => ({
  type: types.REQUEST_SONGS,
  playlist
});

function getNextUrl(playlists, playlist) {
  const activePlaylist = playlists[playlist];
  if (!activePlaylist || activePlaylist.nextUrl === false) {
    return constructUrl(playlist);
  }

  return activePlaylist.nextUrl;
}

function shouldFetchSongs(playlists, playlist) {
  const activePlaylist = playlists[playlist];
  if (!activePlaylist || !activePlaylist.isFetching && (activePlaylist.nextUrl !== null)) {
    return true;
  }

  return false;
}

export function fetchSongs(url, playlist) {
  return (dispatch, getState) => {
    const { authed } = getState();

    dispatch(requestSongs(playlist));

    // console.log('------ FETCH SONGS URL ----: ', url);
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        // console.log('JSON response: ', json);
        // console.log('\n');

        let nextUrl = null;
        let futureUrl = null;

        if (json.next_href) {
          nextUrl = json.next_href;
          nextUrl += (authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
        }
        // console.log('JSON.next_href: ', json.next_href);
        if (json.future_href) {
          futureUrl = json.future_href;
          futureUrl += (authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
        }

        const songs = json.collection
          .map(song => song.origin || song)
          .filter(song => {
            if (playlist in GENRES_MAP) {
              // console.log('### PLAYLIST ###: ', playlist);

              return song.streamable && song.kind === 'track' && song.duration < 600000;
            }

            return song.streamable && song.kind === 'track';
          });

        const normalized = normalize(songs, arrayOf(songSchema));
        const result = normalized.result.reduce((arr, songId) => {
          if (arr.indexOf(songId) === -1) {
            arr.push(songId);
          }

          return arr;
        }, []);

        // console.log('####### FETCH RECEIVED SONGS ########');
        // console.log('entities: ', normalized.entities);
        // console.log('result: ', result);
        // console.log('playlist: ', playlist);
        // console.log('nextUrl :', nextUrl);
        // console.log('futureUrl: ', futureUrl);

        const resultRes = {
          entities: normalized.entities,
          songs: result,
          playlist,
          futureUrl,
          nextUrl,
        };

        // console.log('RECEIVED SONGS RESULT: ', resultRes);
        dispatch(receiveSongs(
          normalized.entities,
          result,
          playlist,
          nextUrl,
          futureUrl,
        ));
      })
      .catch(err => { throw err; });
  };
}

export function fetchSongsIfNeeded(playlist) {
  return (dispatch, getState) => {
    const { playlists } = getState();
    // console.log('--- PLAYLIST ----: ', playlist);
    if (shouldFetchSongs(playlists, playlist)) {
      const nextUrl = getNextUrl(playlists, playlist);
      // console.log('--- NEXT URL ---: ', nextUrl);
      return dispatch(fetchSongs(nextUrl, playlist));
    }

    return null;
  }
}

export function receiveSongs(entities, songs, playlist, nextUrl, futureUrl) {
  return {
    type: types.RECEIVE_SONGS,
    entities,
    songs,
    futureUrl,
    nextUrl,
    playlist,
  };
}

export function removeUnlikedSongsPre() {
  return (dispatch, getState) => {
    const LIKES_PLAYLIST_KEY = `likes${AUTHED_PLAYLIST_SUFFIX}`;
    const { authed, player, playlists } = getState();
    const { currentSongIndex } = player;
    const playingPlaylist = getPlayingPlaylist(player);
    const likedSongs = playlists[LIKES_PLAYLIST_KEY].items
      .filter(songId => songId in authed.likes && authed.likes[songId] === 1);

    if (playingPlaylist === LIKES_PLAYLIST_KEY
    && currentSongIndex >= likedSongs.length) {
      dispatch(changePlayingSong(null));
    }

    dispatch(removeUnlikedSongs(likedSongs));
  };
}