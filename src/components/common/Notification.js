import React, { Component } from 'react';
import SnackBar from './Snackbar'
import { observer } from 'mobx-react'
import UIStore from '../../stores/UIStore'

@observer
export default class Notification extends Component {
    handleClose = () => {
        UIStore.closeSnackBar()
    }
    render() {
        const { open, message, variant, autoHideDuration } = UIStore.snackbar;
        return (
            <SnackBar open={open} message={message} autoHideDuration={autoHideDuration} variant={variant} handleClose={this.handleClose} />
        )
    }
}