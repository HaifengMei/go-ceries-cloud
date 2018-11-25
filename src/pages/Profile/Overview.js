import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import CheckIcon from '@material-ui/icons/CheckCircle';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import PlanIcon from '@material-ui/icons/Loyalty';
import URLIcon from '@material-ui/icons/Link';
import StatusIcon from '@material-ui/icons/Cloud';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function Overview(props) {
  const { classes, sub } = props;
  const { tier, storename } = sub
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item md={3}>
          <Paper className={classes.paper}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ShoppingBasket />
                </ListItemIcon>
                <ListItemText primary="Web Store" secondary={
                  <Typography component="h5" variant="h5" color="textPrimary">
                    {storename}
                  </Typography>
                } />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <PlanIcon />
                </ListItemIcon>
                <ListItemText primary="Plan" secondary={tier.title} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Price" secondary={`${tier.price}/mo`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <StatusIcon />
                </ListItemIcon>
                <ListItemText primary="Status" secondary="Running" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <URLIcon />
                </ListItemIcon>
                <ListItemText primary="Url" secondary={`https://${storename.replace(/ /g, '')}.go-ceries.com`} />
              </ListItem>
            </List>
            <Button color="primary" fullWidth variant="contained" component={Link} to="/pricing">
              Change Plan
            </Button>
          </Paper>
        </Grid>
        <Grid item md={9}>
          <Paper className={classes.paper}>
            <h3> Subscribed Features </h3>
            <Divider />
            <List>
              {
                tier.services.map(service => (
                  <div key={service} >
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={service} />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
