Redux Pre-Thunk middleware
===

Dispatch arrays before using [redux-thunk](https://github.com/gaearon/redux-thunk) and make your code testable again!

But why?
===

Let's say we have the following action:

```javascript
function myThunkAction(firstArgument, secondArgument){
    return function(dispatch, getState){
        // call some backend service with arguments
    }
}
```

and usage in some component:

```javascript
dispatch(myThunkAction(firstArgument, secondArgument));
```

`myThunkAction` can be tested on your own, however if you try to test the place where it is used, you have either to repeat mocking the backend service as it was done in it's unit test or write a poor test which won't check it's parameters.

The test would look like this:
```javascript
expect(dispatch).to.have.been.calledOnce; // not so informative, what if we change arguments and it fails?
```

You can't check the argument value as invoked thunk returns anonymous function. Passing wrong arguments will cause an error. You can even switch entire function as long as test only tells that something was dispatched. Not so good.

Is there way to avoid this test gap?
===

Yes!
===

Using the following structure will allow us to check the arguments:


```javascript
dispatch([ myThunkAction, firstArgument, secondArgument ]);
```

With test: 
```javascript
expect(dispatch).to.have.been.calledWith([ myThunkAction, firstArgument, secondArgument ])
```

This tells us clearly that all arguments are right in place. We are safe and ready to move forward without worries.

Setup
===


```javascript
import preThunk from 'redux-pre-thunk';
```

Add middleware before thunk one. Now the following action will be handled:

```javascript

// first argument is action creator followed by arguments which will be used
dispatch([ myThunkAction, firstArgument, secondArgument ]);
```


Contributions
---

If you have some more ideas you're welcome to create the PR and discuss things together.

Have a nice day!
