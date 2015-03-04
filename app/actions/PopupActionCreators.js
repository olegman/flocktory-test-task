var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  closePopup: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CLOSE_POPUP
    });
  }

};