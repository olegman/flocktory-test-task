var React = require('react');
var App = require('./components/App.js');
var WebAPI = require('./utils/WebAPIUtils.js');

window.React = React; // export for http://fb.me/react-devtools
WebAPI.getAllCompanies();
React.render(<App/>, document.body);