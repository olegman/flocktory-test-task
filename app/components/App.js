var React = require('react');
var CompaniesList = require('./CompaniesList');
var CompareButton = require('./CompareButton');
var Popup = require('./Popup');
var Overlay = require('./Overlay');

var App = React.createClass({
  render: function() {
    return (
      <div className='app'>
        <CompareButton />
        <CompaniesList />
        <Popup />
        <Overlay />
      </div>
    );
  }
});

module.exports = App;