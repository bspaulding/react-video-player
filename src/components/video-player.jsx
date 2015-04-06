var React = require("react/addons");
var ProgressBar = require("./progress-bar.jsx");
var Fullscreen = require("../lib/fullscreen.js");

var VideoPlayer = React.createClass({
  propTypes: {
    sources: React.PropTypes.arrayOf(React.PropTypes.shape({
      src: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired
    }))
  },

  getInitialState: function() {
    return { fullscreenAvailable: false, maximizeProgress: false, canPlay: false, playing: false, percentPlayed: 0, volumePercent: 100 };
  },

  componentDidMount: function() {
    var video = this.video();
    console.log(video.volume);
    video.addEventListener('canplay', this.canPlay);
    video.addEventListener('timeupdate', this.timeupdate);
    this.setState({ fullscreenAvailable: Fullscreen.isAvailable(video) });
  },

  video: function() {
    return React.findDOMNode(this.refs.video);
  },

  keyup: function(event) {
    console.log(event);
  },

  mouseenter: function(event) {
    if (this.state.playing) {
      this.setState({ maximizeProgress: true });
    }
  },

  mouseleave: function(event) {
    this.setState({ maximizeProgress: false });
  },

  canPlay: function() {
    this.setState({ canPlay: true });
  },

  timeupdate: function(event) {
    var video = this.video();
    this.setState({ percentPlayed: video.currentTime / video.duration });
  },

  seek: function(toPercent) {
    var video = this.video();
    var targetTime = (video.seekable.end(0) - video.seekable.start(0)) * toPercent / 100.0;
    video.currentTime = targetTime;
  },

  togglePlaying: function() {
    var video = this.video();
    video.focus();
    video[this.state.playing ? 'pause' : 'play']();
    var playing = !video.paused;
    this.setState({ playing: playing });
  },

  toggleFullscreen: function() {
    Fullscreen.request(this.video());
  },

  volumechanged: function(volumePercent) {
    this.setState({ volumePercent: volumePercent });
    this.video().volume = volumePercent / 100.0;
  },

  render: function() {
    var containerStyle = React.addons.update({
      width: "100%",
    },{
      $merge: this.props.style
    });
    containerStyle.position = "relative";
    var videoStyle = {
      backgroundImage: this.props.poster,
      backgroundSize: "cover",
      width: "100%"
    };

    var pausedContainerStyle = {
      backgroundColor: "rgba(23,23,23,0.3)",
      cursor: "pointer",
      height: "100%",
      position: "absolute",
      width: "100%",
      top: 0
    };
    var pausedNoticeStyle = {
      borderRadius: 4,
      color: "rgb(235,235,235)",
      position: "absolute",
      top: "50%",
      left: "calc(50% - 50px)",
      width: 100,
      textAlign: "center"
    };
    var pausedNotice = (
      <div style={pausedContainerStyle} onClick={this.togglePlaying}>
        <div style={pausedNoticeStyle}>
        {this.state.canPlay ? (
          <span>Paused<br/> Click to Play</span>
        ) : (
          <span>Preloading...</span>
        )}
        </div>
      </div>
    );

    var timelineStyle = {
      bottom: 0,
      left: 0,
      position: "absolute",
      width: "100%",
      zIndex: 1
    };

    var progressContainerStyle = {
      bottom: "4px",
      height: (this.state.maximizeProgress ? 20 : 5),
      opacity: 0.6,
      position: "absolute",
      width: "80%"
    };
    var volumeContainerStyle = {
      bottom: "4px",
      height: (this.state.maximizeProgress ? 20 : 5),
      opacity: 0.6,
      position: "absolute",
      right: 0,
      width: "20%"
    };

    var fullscreenButtonStyle = {
      position: "absolute",
      top: "20px",
      right: "10px"
    };

    return (
      <div style={containerStyle} onMouseEnter={this.mouseenter} onMouseLeave={this.mouseleave} onKeyUp={this.keyup}>
        <video ref="video" style={videoStyle} onClick={this.togglePlaying}>
          {this.props.sources.map(function(source) {
            return <source key={source.src} src={source.src} type={source.type}/>
          })}
          Your browser does not support the <code>video</code> element.
        </video>
        {this.state.playing && this.state.fullscreenAvailable ? <button style={fullscreenButtonStyle} onClick={this.toggleFullscreen}>Fullscreen</button> : ''}
        <div ref="controls">
          <ProgressBar percent={this.state.percentPlayed * 100} onChange={this.seek} containerStyle={progressContainerStyle}/>
          <ProgressBar percent={this.state.volumePercent} onChange={this.volumechanged} containerStyle={volumeContainerStyle}/>
        </div>
        {this.state.playing ? '' : pausedNotice}
      </div>
    )
  }
});

module.exports = VideoPlayer;
