
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddCircle';
import ChangeIcon from '@material-ui/icons/Cached';
import moment from 'moment'

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



class History extends Component {
    formatMessage(sub, idx) {
        const content = JSON.parse(sub.content)
        const tier = content.tier
        if (idx == this.props.subs.length - 1) {
            return (
                <ListItem>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${content.storename} Web Store Created with ${tier.title} Plan option`} secondary={moment(sub.createdAt).format('LLL')} />
                </ListItem>
            )
        } else {
            return (
                <ListItem>
                    <ListItemIcon>
                        <ChangeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Changed ${content.storename} Web Store plan to ${tier.title}`} secondary={moment(sub.createdAt).format('LLL')} />
                </ListItem>
            )

        }
    }

    render() {
        const { classes, subs } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item md={12}>
                        <Paper className={classes.paper}>
                            <List>
                                {
                                    subs.map((sub, index) => (
                                        <div key={sub.subscriptionId} >
                                            {this.formatMessage(sub, index)}
                                            <Divider />
                                        </div>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    };
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(History);
