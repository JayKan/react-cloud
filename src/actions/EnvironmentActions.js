import * as types from '../constants/ActionTypes';

const changeIsMobile = isMobile => ({
  type: types.CHANGE_IS_MOBILE,
  isMobile
});

export const changeWidthAndHeight = (height, width) => ({
  type: types.CHANGE_WIDTH_AND_HEIGHT,
  height,
  width
})

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);

    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    };
  };
}