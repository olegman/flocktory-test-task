var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  receiveAllCompanies: function(rawCompanies) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_COMPANIES,
      rawCompanies: rawCompanies
    });
  }

};