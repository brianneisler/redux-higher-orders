import _ from 'mudash'

export default function applyHigherOrders(...higherOrders) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    reducer = _.compose(...higherOrders)(reducer)
    return createStore(reducer, preloadedState, enhancer)
  }
}
