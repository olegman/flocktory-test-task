var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _companies = {};

var CompaniesStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  createCompaniesFromRawData: function(rawCompanies) {
    var companies = {};
    
    rawCompanies.forEach(function(company) {
      companies[company.id] = company;
    });

    return companies;
  },

  getAll: function() {
    return _companies;
  }

});

CompaniesStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_COMPANIES:
      _companies = CompaniesStore.createCompaniesFromRawData(action.rawCompanies);
      CompaniesStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = CompaniesStore;