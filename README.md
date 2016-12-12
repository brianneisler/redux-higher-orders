# redux-higher-orders
Redux enhancer for composing higher order reducers


## Benefits
- Simple enhancer method for adding higher order reducers to redux.
- Wrap the reducer with functionality ensuring that the higher order reducers run before the primary reducer.


## Build Status
[![npm version](https://badge.fury.io/js/redux-higher-orders.svg)](https://badge.fury.io/js/redux-higher-orders)<br />
[![Build Status](https://travis-ci.org/brianneisler/redux-higher-orders.svg)](https://travis-ci.org/brianneisler/redux-higher-orders)<br />
[![NPM](https://nodei.co/npm/redux-higher-orders.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redux-higher-orders/)


## Install
```js
npm install --save redux-higher-orders
```


## Usage
```js
import { createStore } from 'redux'
import { applyHigherOrders } from 'redux-higher-orders'

const higherOrders = [
  reducer => (state, action) => reducer(state, action),
  higherOrder2,
  higherOrder3
]

let store = createStore(
  reducer,
  initialState,
  applyHigherOrders(...higherOrders)
)
```


### `applyHigherOrders(...higherOrders)`
Higher order reducers are a way to extend the Redux reducer with custom functionality. Higher orders let you wrap the store's internal `reducer` method.

The most common use case for higher order reducers is to support modification of actions or state before/after reduction. An example is to support [batching of actions](https://github.com/tshelburne/redux-batched-actions)


#### Arguments
* `...higherOrders` (*arguments*): Functions that conform to the *higher-order API*. Each higherOrder receives the `reducer` function and returns a reducer function. The higher order signature is `(reducer) => (state, action) => reducer(state, action)`.


#### Returns
* `Function` A store enhancer that applies the given higher order reducers. The store enhancer signature is `createStore => createStore'` but the easiest way to apply it is to pass it to [`createStore()`](http://redux.js.org/docs/api/createStore.html) as the last `enhancer` argument.


#### Example: Custom Logger Higher Order

```js
import { createStore } from 'redux'
import { applyHigherOrders } from 'redux-higher-orders'
import todos from './reducers'

function logger() {
  return (reducer) => (state, action) => {
    console.log('will reduce', action)

    // Reduce the next state
    let resultState = reducer(state, action)
    console.log('state after reduction', resultState)

    return resultState
  }
}

let store = createStore(
  todos,
  [ 'Use Redux' ],
  applyHigherOrders(logger())
)

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand higher orders'
})
```
