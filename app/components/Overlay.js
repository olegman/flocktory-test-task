var React = require('react');
var classNames = require('classnames');
var OverlayStore = require('./../stores/OverlayStore');

var Overlay = React.createClass({
  getInitialState: function () {
    return OverlayStore.get();
  },
  componentDidMount: function () {
    OverlayStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    OverlayStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState(OverlayStore.get());
  },
  render: function() {
    var classes = classNames('overlay', {show: this.state.show});

    return (
      <div className={classes}></div>
    );
  }
});

module.exports = Overlay;