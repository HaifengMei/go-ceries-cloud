import { observable } from 'mobx'
import { action } from 'mobx'

class UIStore {
    @observable loading = false
    @observable snackbar = {
        open: false,
        message: null,
        autoHideDuration: null,
    }

    @action openSnackBar(message, autoHideDuration) {
        this.snackbar = {
            open: true,
            message: message,
            autoHideDuration: autoHideDuration,
        }
    }

    @action closeSnackBar() {
        this.snackbar = {
            open: false,
            message: null,
            autoHideDuration: null,
        }
    }
}

const uiStore = new UIStore()
export default uiStore