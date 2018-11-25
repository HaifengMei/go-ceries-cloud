import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SubscriptionStore from '../stores/SubscriptionStore'
import LoaderButton from '../components/common/LoaderButton';
import UIStore from '../stores/UIStore';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { observer } from 'mobx-react';

const styles = theme => ({
    cardHeader: {
        backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
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
class SubscribeForm extends Component {
    state = {
        storename: ' '
    }

    handleConfirm = async event => {
        event.preventDefault();
        const storename = SubscriptionStore.currentSub ? SubscriptionStore.currentSub.storename : this.state.storename
        const { history, tier } = this.props
        await SubscriptionStore.subscribeEvent(storename, tier, history)
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    validateConfirmationForm() {
        return this.state.storename.length > 0;
    }

    render() {
        const { tier, classes } = this.props
        const { storename } = this.state
        const { loading } = UIStore
        return (
            <div>
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
                </Card>
                <form className={classes.form} onSubmit={this.handleConfirm}>
                    <FormGroup>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">Name your web store</InputLabel>
                            <Input disabled={SubscriptionStore.currentSub != null} id="storename" name="storename" value={SubscriptionStore.currentSub ? SubscriptionStore.currentSub.storename : storename} autoFocus
                                onChange={this.handleChange('storename')} />
                        </FormControl>
                    </FormGroup>
                    <LoaderButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                        disabled={!this.validateConfirmationForm()}
                        title={loading ? 'Subscribing...' : 'Subscribe'}
                        className={classes.submit}
                        fullWidth={true}
                    />
                </form>
            </div>
        )
    }

}

SubscribeForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubscribeForm);