var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  selectCompany: function(params) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SELECT_COMPANY,
      selected: params.selected,
      company: params.company
    });
  }

};