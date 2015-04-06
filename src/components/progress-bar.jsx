var React = require("react/addons");

var ProgressBar = React.createClass({
  getDefaultProps: function() {
    return {
      containerStyle: {}
    };
  },

  click: function(event) {
    if (this.props.onChange && "function" === typeof this.props.onChange) {
      var rect = this.getDOMNode().getClientRects()[0];
      console.log(rect);
      console.log(event.clientX);
      var progress = (event.clientX - rect.left) / rect.width;
      this.props.onChange(progress * 100);
    }
  },

  render: function() {
    var containerStyle = React.addons.update({
      backgroundColor: "white",
      height: 20,
      width: "100%",
      WebkitTransition: 'height 0.3s',
      MozTransition: 'height 0.3s',
      msTransition: 'height 0.3s',
    },{
      $merge: this.props.containerStyle
    });

    var progressStyle = {
      backgroundColor: "red",
      height: "100%",
      WebkitTransition: 'width 0.3s',
      MozTransition: 'width 0.3s',
      msTransition: 'width 0.3s',
      width: [this.props.percent, "%"].join('')
    };

    return (
      <div ref="container" style={containerStyle} onClick={this.click}>
        <div ref="progress" style={progressStyle}>
        </div>
      </div>
    );
  }
});

module.exports = ProgressBar;
