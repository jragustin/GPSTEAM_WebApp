import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Header from './Header'
import Sidebar from './Sidebar'
import Contents from './Contents'
import CssBaseline from '@material-ui/core/CssBaseline';
/*
  App collects the contents of the application like the Header, sidebar and the contents
*/
const drawerWidth = 240;

// this is just a function style that contains objects
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: 0,
    height: 'calc(100vh - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
      marginTop: 64,
    },
  },
});

//App
class App extends React.Component {
  state = {
    mobileOpen: false,
  };
  //if the window tab is min size the sidebar will minimize or close
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <div className={classes.appFrame}>
          <Header classes={classes} handleDrawerToggle={this.handleDrawerToggle}/>
          <Sidebar classes={classes} handleDrawerToggle={this.handleDrawerToggle} theme={theme} mobileOpen={this.state.mobileOpen}/>
          <Contents classes={classes} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);