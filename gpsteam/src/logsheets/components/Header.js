/*
The header contains the tabs and its corresponding value per tab,
which lists all the campaign and continuous logs from the admins.
*/
/*
these are required for the UI
*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

/*
The two below are the campaign and continuous logsheets
*/
import CampaignLogsheets from './campaign/CampaignLogsheets';
import ContinuousLogsheets from './continuous/ContinuousLogsheets';

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

/*
These is a requirement to render the list of logsheets
*/
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
/*
Just styles for the tabs
*/


class Header extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div >
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered> 
            <Tab label="Campaign Logsheets" />
            <Tab label="Continuous Logsheets" />
          </Tabs>
        </AppBar>
        {/*
          The values here are simply the lists of 
          logsheets exported from their components
        */}
        {value === 0 && <TabContainer><CampaignLogsheets/></TabContainer>}
        {value === 1 && <TabContainer><ContinuousLogsheets/></TabContainer>}
      </div>
    );
  }
}

/*
To check if property "classes" returns an object
*/

export default (Header);