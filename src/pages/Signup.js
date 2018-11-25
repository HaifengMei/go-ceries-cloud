import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import LoaderButton from '../components/common/LoaderButton';
import UIStore from '../stores/UIStore';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

@observer
class Signup extends Component {

    state = {
        password: '',
        confirmpassword: '',
        showPassword: false,
        email: "",
        confirmationCode: "",
        newUser: null,
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        const { email, password, confirmationCode } = this.state
        await UserStore.confirmSubmit(email, password, confirmationCode, this.props.history)
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state
        const newUser = await UserStore.signup(email, password)
        if (newUser) {
            this.setState({
                newUser
            });
        }
    }




    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    renderConfirmationForm() {
        const { classes } = this.props;
        const { confirmationCode } = this.state;
        const { loading } = UIStore;
        
        return (
            <form className={classes.form} onSubmit={this.handleConfirmationSubmit}>
                <FormGroup>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="tel">Confirmation Code</InputLabel>
                        <Input id="confirmationCode" name="confirmationCode" value={confirmationCode} autoFocus
                            value={confirmationCode}
                            onChange={this.handleChange('confirmationCode')} />
                    </FormControl>
                    <FormHelperText>Please check your email for the code.</FormHelperText>
                </FormGroup>
                <LoaderButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={loading}
                    disabled={!this.validateConfirmationForm()}
                    title={loading ? 'Verifying...' : 'Verify'}
                    className={classes.submit}
                    fullWidth={true}
                />
            </form>
        );
    }

    renderForm() {
        const { classes } = this.props;
        const { password, confirmpassword, showPassword, email, loading } = this.state;
        return (

            <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" value={email} autoFocus onChange={this.handleChange('email')} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                    <Input
                        id="confirmpassword"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmpassword}
                        onChange={this.handleChange('confirmpassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <LoaderButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={loading}
                    disabled={!this.validateForm()}
                    title={loading ? 'Signing up..' : 'Submit'}
                    className={classes.submit}
                    fullWidth={true}
                />
            </form>

        )
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                </Typography>
                    {this.state.newUser === null
                        ? this.renderForm()
                        : this.renderConfirmationForm()}
                </Paper>
            </main>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);