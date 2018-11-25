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
import ServiceIcon from '@material-ui/icons/Build';

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

function Resources(props) {
    const { classes, sub } = props;
    const { tier } = sub
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        <List>
                            {
                                tier.resources.map(resource => (
                                    <div key={resource} >
                                        <ListItem>
                                            <ListItemIcon>
                                                <ServiceIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={resource} />
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

Resources.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Resources);
