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
    width: 160,
  },
});

const featuredPosts = [
  {
    title: 'Analyze your data',
    date: 'Nov 25',
    description:
      'Your storefont is also working in the background to analyze your user data and feed reports on their trends and other categories that are relavant to you',
    img: 'data:image/jpeg;base64,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'
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
