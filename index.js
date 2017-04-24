'use strict';

var MIDDLEWARE_ACTION_TYPE = require('./constants').MIDDLEWARE_ACTION_TYPE;

function executeAction (actionCreator) {
    var params = Array.prototype.slice.call(arguments, 1);

    return {
        type: MIDDLEWARE_ACTION_TYPE,
        actionCreator: actionCreator,
        params: params
    };
}

module.exports.executeAction = executeAction;