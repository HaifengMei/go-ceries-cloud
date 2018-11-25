import { observable, autorun } from 'mobx'
import { size, find } from 'lodash'
import { Auth } from "aws-amplify";
import { action } from 'mobx'
import UIStore from './UIStore'

class UseStore {
    @observable email = null
    @observable isAuthenticated = false
    @observable isAuthenticating = true;

    isLoggedIn() {
        return this.isAuthenticated
    }

    @action async authenticate() {
        try {
            await Auth.currentSession();
            this.isAuthenticated = true;
        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        this.isAuthenticating = false;
    }

    @action async login(email, password, history) {
        UIStore.loading = true
        UIStore.openSnackBar(`Logging in`)
        try {
            await Auth.signIn(email, password);
            this.email = email
            this.isAuthenticated = true
            UIStore.loading = false
            history.push('/')
            UIStore.openSnackBar(`Welcome ${email}`, 5000)

        } catch (e) {
            UIStore.loading = false
            UIStore.openSnackBar(e.message, null)
        }
    }

    @action async logout(history) {
        try {
            await Auth.signOut();
            this.isAuthenticated = false
            this.email = null
            history.push('/login')
        } catch (e) {
            UIStore.openSnackBar(e.message, null)
        }
    }

}

const userStore = new UseStore()
export default userStore