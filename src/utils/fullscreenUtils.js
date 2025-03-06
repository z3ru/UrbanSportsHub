export const enterFullscreen = () => {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen(); // Standard fullscreen request
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen(); // Firefox
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen(); // Chrome, Safari, Opera
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen(); // IE/Edge
  }
};

export const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.mozFullScreenElement) {
    document.mozCancelFullScreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  } else if (document.msFullscreenElement) {
    document.msExitFullscreen();
  }
};
