var ServerActionCreators = require('../actions/ServerActionCreators');
var data = require('../data.json');

module.exports = {

  getAllCompanies: function() {
    var rawCompanies = data;
    ServerActionCreators.receiveAllCompanies(rawCompanies);
  }

};