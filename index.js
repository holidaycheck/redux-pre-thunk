'use strict';

function middleware() {
    return function (next) {
        return function (action) {
            if (action instanceof Array) {
                var actionCreator = action[0];
                var params = action.slice(1);

                if (actionCreator instanceof Function) {
                    return next(actionCreator.apply(null, params))
                }

                throw new Error('First element in array should be a thunk! It was: ' + typeof action[0]);
            }

            return next(action);
        }
    };
};

module.exports = middleware;
