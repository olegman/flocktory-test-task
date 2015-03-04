var React = require('react');
var CompareStore = require('./../stores/CompareStore');
var CompareActionCreators = require('./../actions/CompareActionCreators');

function getState() {
  var compareStore = CompareStore.get();
  return {
    disabled: compareStore.min > compareStore.current
  }
}

var CompareButton = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    CompareStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CompareStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState());
  },
  compare: function() {
    CompareActionCreators.compare();
  },
  render: function() {
    return (
      <button onClick={this.compare} type="button" className='compare btn btn-default' disabled={this.state.disabled}>Compare</button>
    );
  }
});

module.exports = CompareButton;