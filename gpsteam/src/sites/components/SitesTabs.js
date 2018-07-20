import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tab, Tabs, Typography } from '@material-ui/core/';
import AllSites from './AllSites'; 
import CampaignSites from './CampaignSites'; 
import ContinuousSites from './ContinuousSites'; 

function TabContainer(props) {
    return (
      /*
      The typography contains the values of the logsheets
      in the tab containers
      */
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  

const styles = {
  root: {
    flexGrow: 1,
  },
};



class SitesTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="All Sites" />
          <Tab label="Campaign Sites" />
          <Tab label="Continuous Sites" />
        </Tabs>

        {value === 0 && <TabContainer><AllSites/></TabContainer>}
        {value === 1 && <TabContainer><CampaignSites/></TabContainer>}
        {value === 2 && <TabContainer><ContinuousSites/></TabContainer>}
      </Paper>
    );
  }
}

SitesTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SitesTabs);