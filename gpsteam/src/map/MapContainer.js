import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Drawer, IconButton, Hidden } from 'material-ui/';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import SearchIcon from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import SearchBar from 'material-ui-icons/Search'
import { connect } from 'react-redux'
import * as mapActions from './mapActions'
import { client } from '../index'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PhMap from './Map'
import SitesList from './SitesList'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  drawerPaperRight: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    border: 0
  },
  drawerPaperBottom: {
    position: 'relative',
    height: '50vh',
    width: '100%',
    border: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: '#bdc3c7',
    ...theme.mixins.toolbar,
  },
  drawerInner: {
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-style': {
    [theme.breakpoints.up('sm')]: {
      marginRight: -drawerWidth-1,
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '-50vh',
      height: `calc(100% - 50vh)`
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-margin': {
    [theme.breakpoints.up('sm')]: {
      marginRight: 0
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: 0,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 50,
      '&:focus': {
        width: 80,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '50%',
    '&:focus': {
      outline: 0,
    },
  }
});

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      sites: client.readQuery({
        query: gql`
            {
                sites(order: "name") {
                    id
                    name
                    description
                    location
                    longitude
                    latitude
                    surveyType {
                        type
                    }
                }
            }
        `
        }),
        /*
        Initializes the values of the sites of Camp, Continuous,
        and searched. They are all null for the moment, values will added later.
        The sitesSearched values will be dependent on the search state.
        It is empty right now.
        */
        sitesCamp: null,
        sitesCont: null,
        sitesSearched: null,
        search: ''
    }
  }

  componentWillMount() {
    // remove undefined surveytypes and undefined coordinates
    
    /*
    These are now the determined values of the sites.
    They will be the given names, latitudes, and longitudes.
    It will then be filtered later to display in the map and the 
    sitesList.
    */
    let filtered = this.state.sites.sites.filter(s => {
      return s.surveyType && s.latitude && s.longitude
    })

    let sitesCamp = filtered.filter(s => {
      return s.surveyType.type === 'campaign'
    })

    let sitesCont = filtered.filter(s => {
      return s.surveyType.type === 'continuous'
    }) 

    let sitesSearched = filtered.filter(s => {
      return this.state.search
    })

    this.setState({ sites: filtered, sitesCamp, sitesCont, sitesSearched })
  }
  
  updateSearch(event) {
    /*
    This will handle the inputs given in the search bar.
    The values should be only up to 20.
    */
    this.setState({search:event.target.value.toUpperCase().substr(0, 4)})
    console.log(event.target.value)
  }

  render() {
    const { classes, drawerOpen, showCampaignSites, showContinuousSites, showSitesSearched } = this.props;
    const { sites, sitesCamp, sitesCont, sitesSearched } = this.state

    /*
    An empty list will be declared first that will be filled up 
    by the sites.
    */
    let list = []
    
    if(showCampaignSites) {
      list = sitesCamp
    }
    if(showContinuousSites) {
      list = sitesCont
    }
    if(showCampaignSites && showContinuousSites) {
      list = sitesCont.concat(sitesCamp)
    }

    /*
    If the argument is to showSitesSearched,
    the list will contain all the sitesSearched matched.
    */

    if(showSitesSearched){
      list = sitesSearched
    }

    /*
    the searchedlist will filter through the current list
    which will then be passed to the sitesList.
    */
    let searchedList = list.filter(
      (list) => {
        return list.name.indexOf(
          this.state.search) !==-1;
      }
    );

    // sort alphabetically
    searchedList.sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })

    const drawerRight = (
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaperRight,
        }}
        anchor='right'
        open={drawerOpen}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <div className={classes.wrapper}>
              <div className={classes.search}>
                <SearchIcon color='contrast'/>
              </div>
              {/*
              The input bar for the search. To know more about searches in
              React, view:
              https://www.youtube.com/watch?v=OlVkYnVXPl0&index=16&list=PLLnpHn493BHFfs3Uj5tvx17mXk4B4ws4p
              */}
              <input type="text" 
              className={classes.input} 
              placeholder='Search' 
              value={this.state.search} 
              onChange={this.updateSearch.bind(this)}/>
            </div>
            <IconButton onClick={this.props.closeDrawer}>
              <ChevronRightIcon />
            </IconButton>
          
          </div>
          <SitesList sites={searchedList}/>
        </div>
      </Drawer>
    );

// This does not make sense. Please uncomment if you see the significance doing this.
/*    const drawerBottom = (<Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaperBottom,
        }}
        anchor='bottom'
        open={drawerOpen}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <SearchBox />
            <IconButton onClick={this.props.closeDrawer}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <SitesList sites={list}/>
        </div>
      </Drawer>
    );
*/
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <main
            className={classNames(classes.content, classes[`content-style`], {
              [classes.contentShift]: drawerOpen,
              [classes[`contentShift-margin`]]: drawerOpen,
            })}
          >
            <PhMap sites={sites}/>
          </main>
          <Hidden smDown>{drawerRight}</Hidden>
          {/*part of the nonsense*/}
          {/*<Hidden smUp>{drawerBottom}</Hidden>*/}
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { ...state.map }
}

Map = connect(mapStateToProps, { ...mapActions })(Map)

export default withStyles(styles, { withTheme: true })(Map);