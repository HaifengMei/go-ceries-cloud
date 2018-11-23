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
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import UserStore from '../../stores/UserStore'

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

@observer
class HeaderAppBar extends Component {

  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    if (UserStore.isLoggedIn()) {
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
    const auth = UserStore.isLoggedIn()

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="primary" className={classes.toolbarTitle}>
              <Link className={classes.link} to="/">Go-Ceries</Link>
            </Typography>
            {auth
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
                <Button component={Link} to="/login">
                  Login
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/signup">
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
    <Button component={Link} to="/pricing">
      Pricing
    </Button>
    <Button component={Link} to="/profile">
      Profile
    </Button>
  </div>
}

function LoggedOutMenu() {
  return <div>
    <Button component={Link} to="/pricing">
      Pricing
    </Button>
  </div>
}

HeaderAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderAppBar);