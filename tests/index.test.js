var test = require('tape');
var sinon = require('sinon');

var middleware = require('../');

test('middleware should handle action by passing action creator called with params to next middleware', function(t) {
  const store = { dispatch: sinon.spy() };
  const handledAction = { type: 'SUCCESS' };
  const actionCreatorStub = sinon.stub().returns(handledAction);
  const nextSpy = sinon.spy();
  const action = [ actionCreatorStub, 'first-argument', true ];

  t.plan(4);

  middleware(store)(nextSpy)(action);

  t.same(nextSpy.callCount, 1);
  t.same(store.dispatch.callCount, 0);
  t.same(handledAction, nextSpy.firstCall.args[0]);
  t.same(['first-argument', true], actionCreatorStub.firstCall.args);
});

test('middleware should throw when handled action has no actionCreator', function(t) {
  const store = { dispatch: sinon.spy() };
  const handledAction = { type: 'SUCCESS' };
  const nextSpy = sinon.spy();
  const action = [ {}, 'first-argument', true ];

  t.plan(1);

  t.throws(middleware(store)(nextSpy).bind(null, action), Error);
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
