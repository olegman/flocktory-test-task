var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  compare: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.COMPARE
    });
  }

};