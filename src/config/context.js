import Common from '../stores/Common'
import Account from '../stores/Account'

export default (state) => {
  return {
    state,
    store: {
      account: new Account(state),
      common: new Common(state)
    }
  }
}
