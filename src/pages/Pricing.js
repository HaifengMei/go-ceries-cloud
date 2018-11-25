import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import UIStore from '../stores/UIStore'
import Dialog from '../components/common/Dialog'
import SubscribeForm from './SubscribeForm'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
});

const tiers = [
  {
    id: 1,
    title: 'Basic',
    price: '30',
    services: [
      '100 users accounts',
      '5 GB of storage',
      'Help center access',
      'Email support',
      'Preset Store Templates'],
    resources: [
      'Web Store Application',
      'Product Management Engine',
      'Order Management Engine',
      'Customer Mangement Engine : 100 Users',
      'Storage Management : 5GB'],
    buttonText: 'Sign up ',
    buttonVariant: 'outlined',
  },
  {
    id: 2,
    title: 'Advance',
    subheader: 'Most popular',
    price: '70',
    services: [
      '500 customers accounts',
      '50 GB of storage',
      'Help center access',
      'Priority email support',
      'Report access',
      'Custom Store Templates',
    ],
    resources: [
      'Web Store Application',
      'Product Management Engine',
      'Order Management Engine',
      'Customer Mangement Engine: 500 Users',
      'Storage Management : 50GB',
      'Report Management Engine',
      'Store Builder Engine'],
    buttonText: 'Get Started',
    buttonVariant: 'contained',
  },
  {
    id: 3,
    title: 'Premium',
    price: '3000',
    services: [
      'Unlimited customer accounts',
      'Unlimited storage',
      'Help center access',
      'Phone & email support',
      'Report access',
      'Custom Store Templates',
      'Marketing and Recommendation'
    ],
    resources: [
      'Web Store Application',
      'Product Management Engine',
      'Order Management Engine',
      'Customer Mangement Engine: Unlimited Users',
      'Storage Management : Ulimited Storage',
      'Report Management Engine',
      'Store Builder Engine',
      'Marketing and Recommendation Management Engine'],
    buttonText: 'Sign up',
    buttonVariant: 'outlined',
  },
];

@observer
class Pricing extends Component {
  state = {
    tier: tiers[0]
  }

  handleSelect = (tier) => {

    if (UserStore.isLoggedIn()) {
      this.setState({ tier: tier })
      UIStore.openDialog()
    } else {
      this.props.history.push('/signup')
    }
  }

  render() {
    const { classes } = this.props;
    const { open } = UIStore.dialog;
    const auth = UserStore.isLoggedIn()
    const { tier } = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Pricing
          </Typography>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
              Quickly build an effective pricing table for your potential customers with this layout.
              It&apos;s built with default Material-UI components with little customization.
          </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {tiers.map(tier => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                    </Typography>
                    </div>
                    {tier.services.map(line => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={() => this.handleSelect(tier)}>
                      {auth ? "Select" : tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog
            open={open} title='Confirm Plan'
            confirmText='confirm'
            handleClose={UIStore.closeDialog}
          >
            <SubscribeForm tier={tier} history={this.props.history} />
          </Dialog>
        </main>
      </React.Fragment>
    );
  }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);