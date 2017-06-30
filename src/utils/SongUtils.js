import moment from 'moment';
import { CLIENT_ID } from '../constants/Config';
import { GENRES_MAP, IMAGE_SIZES } from '../constants/SongConstants';

export function getImageUrl(s, size = null) {
  let str = s;
  if (!str) return '';

  str = str.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return str.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return str.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return str;
  }
}