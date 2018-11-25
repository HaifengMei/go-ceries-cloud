import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Overview from './Overview'
import SubStore from '../../stores/SubscriptionStore'
import UIStore from '../../stores/UIStore'
import LoadingScreen from '../../components/common/Loading'
import { observer } from 'mobx-react';
import Resources from './Resources'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import History from './History'
import UserStore from '../../stores/UserStore';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },

    layout: {
        marginTop: theme.spacing.unit * 5,
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },

    mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
    },

    paper: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

@observer
class Profile extends Component {
    state = {
        value: 0,
    };

    async componentDidMount() {
        await SubStore.getSubscriptions()
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const Subs = SubStore.allSubs
        const currentSub = SubStore.currentSub
        const { loading } = UIStore

        if (!UserStore.isLoggedIn()) {
            this.props.history.push('/')
        }

        if (loading) {
            return (
                <LoadingScreen />
            )
        }

        if (Subs.length == 0) {
            return (
                <div className={classes.layout}>
                    <Paper className={classes.paper}>
                        <h3> No Web Store Found </h3>
                        <Button color="primary" variant="contained" component={Link} to="/pricing">
                            Create Web Store
                    </Button>
                    </Paper>
                </div>

            )
        }

        return (
            <div className={classes.layout}>
                <main>
                    <Paper className={classes.mainFeaturedPost}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            scrollable
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab label="Overview" icon={<ShoppingBasket />} />
                            <Tab label="Resources" icon={<SettingsIcon />} />
                            <Tab label="History" icon={<HistoryIcon />} />
                        </Tabs>
                        {value === 0 && <TabContainer>{Subs.length > 0 && <Overview sub={currentSub} />}</TabContainer>}
                        {value === 1 && <TabContainer>{Subs.length > 0 && <Resources sub={currentSub} />}</TabContainer>}
                        {value === 2 && <TabContainer>{Subs.length > 0 && <History subs={Subs} />}</TabContainer>}
                    </Paper>
                </main>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);