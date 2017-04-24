'use strict';

var MIDDLEWARE_ACTION_TYPE = require('../constants').MIDDLEWARE_ACTION_TYPE;

function middleware() {
    return function (next) {
        return function (action) {
            if (action.type && action.type === MIDDLEWARE_ACTION_TYPE) {
                return next(action.actionCreator.apply(this, action.params));
            }

            return next(action);
        }
    };
};

module.exports = middleware;
