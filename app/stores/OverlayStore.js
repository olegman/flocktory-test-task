var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _overlay = {
  show: false
};

var OverlayStore = assign({}, EventEmitter.prototype, {

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
    return _overlay;
  },

});

OverlayStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.COMPARE:
      _overlay.show = true;
      OverlayStore.emitChange();
      break;

    case ActionTypes.CLOSE_POPUP:
      _overlay.show = false;
      OverlayStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = OverlayStore;