import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import bannerImg from '../assets/img/banner.jpg'
import CardActionArea from '@material-ui/core/CardActionArea';


const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 5,
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      background: `url(${bannerImg}) no-repeat right`,
      backgroundSize: '50%',
    },
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    maxWidth: 160,
    maxHeight: 257
  },
});

const featuredPosts = [
  {
    title: 'Analyze your data',
    date: 'Nov 25',
    description:
      'Your storefont is also working in the background to analyze your user data and feed reports on their trends and other categories that are relavant to you',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTn-sDTR134ngAfq3yzInJtcqz2kYvbg06VY1h1GUWCkPe2plkJg',
  },
  {
    title: 'Closing the gap for small business owners',
    date: 'Nov 20',
    description:
      'Small business owners can now enter the realm of e-commerce, without a huge upfront cost',
    img: 'https://sloanreview.mit.edu/content/uploads/2016/04/IGH-Complexity-Competitive-Edge-1200.jpg'
  },
];


function Home(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Hidden smUp>
                <Grid item md={12}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.media}
                        height="140"
                        image={bannerImg}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          E-Commerce Made Easy.
                      </Typography>
                        <Typography component="p">
                          Quick storefront setup, easy management of inventory and mobile optimization
                      </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
                      E-Commerce Made Easy.
                  </Typography>
                    <Typography variant="h5" color="textPrimary" paragraph>
                      Quick storefront setup, easy management of inventory and mobile optimization
                  </Typography>
                  </div>
                </Grid>
              </Hidden>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={40} className={classes.cardGrid}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {post.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Continue reading...
                      </Typography>
                    </CardContent>
                  </div>
                  <Hidden xsDown>
                    <CardMedia
                      component="img"
                      className={classes.cardMedia}
                      image={post.img}
                      title="Reports"
                    />
                  </Hidden>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* End sub featured posts */}</main>
      </div>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
