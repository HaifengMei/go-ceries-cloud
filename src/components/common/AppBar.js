import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
});

@inject('store')
@observer
class HeaderAppBar extends Component {

  state = {
    auth: true,
    anchorEl: null,
  };

  handleLogin = () => {
    const account = this.props.store.account
    account.isLoggedIn() == 0 ? account.login() : account.logout()
  }

  handleMenu = event => {
    const account = this.props.store.account
    if (account.isLoggedIn()) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const store = this.props.store;
    const auth = store.account.isLoggedIn()

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="primary" className={classes.toolbarTitle}>
              <Link className={classes.link} to="/">Go-Ceries</Link>
            </Typography>
            {store.account.isLoggedIn()
              ? <LoggedInMenu />
              : <LoggedOutMenu />}
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleLogin}>Logout</MenuItem>
                </Menu>
              </div>
            ) :
              <div>
                <Button onClick={this.handleLogin}>
                  Login
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleLogin}>
                  Register
                  </Button>
              </div>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

function LoggedInMenu() {
  return <div>
    <Button component={Link} to="/Pricing">
      Pricing
    </Button>
    <Button component={Link} to="/Profile">
      Profile
    </Button>
  </div>
}

function LoggedOutMenu() {
  return <div>
    <Button component={Link} to="/Pricing">
      Pricing
    </Button>
  </div>
}

HeaderAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderAppBar);