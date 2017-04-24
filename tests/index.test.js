var test = require('tape');
var sinon = require('sinon');

var executeAction = require('../').executeAction;
var middleware = require('../middleware');

test('middleware should handle action by passing action creator called with params to next middleware', function(t) {
  const store = { dispatch: sinon.spy() };
  const actionCreatorStub = sinon.stub();
  const nextSpy = sinon.spy();
  const handledAction = { type: 'TEST' };
  const action = {
    type: '@@MIDDLEWARE_REDUX_PRE_THUNK',
    params: [ 'abcd', true ],
    actionCreator: actionCreatorStub.returns(handledAction)
  };

  t.plan(3);

  middleware(store)(nextSpy)(action);

  t.same(nextSpy.callCount, 1);
  t.same(store.dispatch.callCount, 0);
  t.same(handledAction, nextSpy.firstCall.args[0]);
});

test('middleware should pass non middleware specific action to the next middleware', function(t) {
  const store = {};
  const nextSpy = sinon.spy();
  const otherAction = { type: 'NOT_MIDDLEWARE_SPECIFIC_OBJECT' };
  const thunkAction = function() { return 'NOT_MIDDLEWARE_SPECIFIC_THUNK'};

  middleware(store)(nextSpy)(otherAction);
  middleware(store)(nextSpy)(thunkAction);

  t.plan(3);

  t.same(nextSpy.callCount, 2);
  t.same(otherAction, nextSpy.firstCall.args[0]);
  t.same(thunkAction, nextSpy.secondCall.args[0]);
});

test('executeAction should create an action that will be handled by middleware', function(t) {
  const actionCreator = function() {};

  t.plan(1);

  t.same(executeAction(actionCreator, 'title', { data: 'test' }), {
    type: '@@MIDDLEWARE_REDUX_PRE_THUNK',
    params: [ 'title', { data: 'test' } ],
    actionCreator: actionCreator
  })
});