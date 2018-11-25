import { observable } from 'mobx'
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

    async signup(email, password) {
        UIStore.loading = true
        try {
            const newUser = await Auth.signUp({
                username: email,
                password: password
            });
            UIStore.loading = false
            return newUser
        } catch (e) {
            UIStore.loading = false
            if (e.code === "UsernameExistsException") {
                UIStore.openSnackBar(e.message + ' A new code is sent to your email.', null, null)
                Auth.resendSignUp(email)
                return e.code
            } else {
                UIStore.openSnackBar(e.message, null, null)
                return null

            }
        }

    }

    @action async confirmSubmit(email, password, confirmationCode, history) {
        UIStore.loading = true
        try {
            await Auth.confirmSignUp(email, confirmationCode);
            await this.login(email, password, history)
        } catch (e) {
            UIStore.loading = false
            UIStore.openSnackBar(e.message, null)
        }

    }

    @action async login(email, password, history) {
        UIStore.loading = true
        try {
            await Auth.signIn(email, password);
            this.email = email
            this.isAuthenticated = true
            UIStore.loading = false
            history.push('/profile')
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