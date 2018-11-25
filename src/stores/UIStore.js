import { observable } from 'mobx'
import { action } from 'mobx'

class UIStore {
    @observable loading = false
    @observable snackbar = {
        open: false,
        message: null,
        autoHideDuration: null,
        specialAction: null
    }

    @observable dialog = {
        open: false,
        title: null,
        confirmText: 'confirm',
        closeAction: null,
        children: null
    }

    @action openDialog(title = null, confirmText = 'confirm', closeAction = null, children = null) {
        this.dialog = {
            open: true,
            title: title,
            confirmText: confirmText,
            closeAction: closeAction,
            children: children
        }
    }

    @action closeDialog = () => {
        this.dialog = {
            open: false,
            title: '',
            confirmText: 'confirm',
            children: null
        }
    }

    @action openSnackBar(message = null, autoHideDuration = null) {
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