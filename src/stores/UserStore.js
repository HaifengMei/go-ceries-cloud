import { observable } from 'mobx'
import { size, find } from 'lodash'
import { Auth } from "aws-amplify";
import { action } from 'mobx'
import UIStore from './UIStore'

class UseStore {
    @observable email = null

    isLoggedIn() {
        return size(this.email)
    }

    @action async login(email, password, history) {
        // UIStore.loading = true
        // Auth.signIn(email, password).then(e => {
        //     this.email = email
        //     UIStore.openSnackBar(`Welcome ${email}`, 6000, 'success')
        // }).error(e => {
        //     UIStore.openSnackBar(e.message, null, 'error')
        // })

        UIStore.loading = true
        try {
            await Auth.signIn(email, password);
            this.email = email
            UIStore.loading = false
            history.push('/')
            UIStore.openSnackBar(`Welcome ${email}`, 6000)
            
        } catch (e) {
            UIStore.loading = false
            UIStore.openSnackBar(e.message, null)
        }
    }


}

const userStore = new UseStore()
export default userStore