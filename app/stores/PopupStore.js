var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _popup = {
  show: false
};

var PopupStore = assign({}, EventEmitter.prototype, {

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
    return _popup;
  },

});

PopupStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.COMPARE:
      _popup.show = true;
      PopupStore.emitChange();
      break;

    case ActionTypes.CLOSE_POPUP:
      _popup.show = false;
      PopupStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = PopupStore;