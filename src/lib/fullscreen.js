module.exports = {
  isAvailable: function(element) {
    return element.requestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
  },
  request: function(elem) {
    // stolen from https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
};
