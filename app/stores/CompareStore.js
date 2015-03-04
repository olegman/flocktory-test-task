var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _compare = {
  min: 2,
  max: 6,
  current: 0,
  companies: {}
};

var CompareStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _compare;
  },

  getAllCompanies: function() {
    return _compare.companies;
  },

  getCompanyById: function(id) {
    if (_compare.companies[id]) {
      return _compare.companies[id];
    } else {
      return null;
    }
  }

});

CompareStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.SELECT_COMPANY:
      if (action.selected) {
        _compare.companies[action.company.id] = action.company;
        _compare.current++;
      } else {
        delete _compare.companies[action.company.id];
        _compare.current--;
      }
      CompareStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = CompareStore;