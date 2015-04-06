var React = require("react");
var VideoPlayer = require("./components/video-player.jsx");

var sources = [{ src: "video.mp4", type: "video/mp4" }];
var style = {
  maxWidth: "640px",
  margin: "0px auto"
};
React.render(<VideoPlayer poster="poster.png" sources={sources} style={style}/>, document.body);
