var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_COMPANIES: null,
    SELECT_COMPANY: null,
    COMPARE: null,
    CLOSE_POPUP: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};