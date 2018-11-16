import { extendObservable, toJS } from 'mobx'

/**
 * This is our state, we update it
 * using the methods from other stores
 */
class State {
  constructor(state) {
    extendObservable(this, {

      account: {
        username: null,
        token: null
      },

      common: {
        title: 'Go-Ceries',
        statusCode: 200,
        hostname: 'localhost'
      },

    }, state)
  }
}

export default process.env.BROWSER ? (
  window.__STATE = new State(window.__STATE)
) : new State({})
