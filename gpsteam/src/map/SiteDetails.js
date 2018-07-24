/*
This file will contain all the logsheets of the site clicked.
It will only be available for viewing (Read), but if the user wants to
edit or delete a file, he must go to the sites tab.
*/

import React, { Component }  from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Paper, Grid, Table, TableRow, TableBody, TableCell } from '@material-ui/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, List } from 'material-ui'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


class SiteDetails extends Component {
  
  siteLogger(site){
    try {
    	
        if (site.surveyType.type === 'campaign') {
            const { site, data, classes } = this.props
            return( site.campaignLogsheets.edges.map((campaign) => {
                return (
                      <ExpansionPanel key={campaign.node.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>{campaign.node.date}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                <li>
                                    Date: {campaign.node.date}
                                </li>
                                <li>
                                    Height North Meters: {campaign.node.heightNorthMeters}
                                </li>
                                <li>
                                    Height East Meters: {campaign.node.heightEastMeters}
                                </li>
                                <li>
                                    Height South Meters: {campaign.node.heightSouthMeters}
                                </li>
                                <li>
                                    Height West Meters: {campaign.node.heightWestMeters}
                                </li>
                                <li>
                                    Time Started: {campaign.node.timeStart}
                                </li>
                                <li>
                                    Time Finished: {campaign.node.timeEnd}
                                </li>
                                <li>
                                    Failure Time: {campaign.node.failureTime}
                                </li>
                                <li>
                                    Azimuth: {campaign.node.azimuth}
                                </li>
                                <li>
                                    Notes: {campaign.node.notes}
                                </li>
                                <li>
                                     Antenna ID: {campaign.node.antenna_id}
                                </li>
                                <li>
                                    Receiver ID: {campaign.node.receiver_id}
                                </li>
                            </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                );
            }));
        }else{
            const { site, data, classes } = this.props
            return( site.continuousLogsheets.edges.map((continuous) => {
                return (
                      <ExpansionPanel key={continuous.node.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>{continuous.node.date}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                <li>
                                    Date: {continuous.node.date}
                                </li>
                                <li>
                                    Is On: {continuous.node.isPowerOn}
                                </li>
                                <li>
                                    Battery Condtion: {continuous.node.batteryCondition}
                                </li>
                                <li>
                                    Charger Condition: {continuous.node.chargerCondition}
                                </li>
                                <li>
                                    Other Notes: {continuous.node.otherNotes}
                                </li>
                                <li>
                                    Created at: {continuous.node.createdAt}
                                </li>
                                <li>
                                     Antenna ID: {continuous.node.antenna_id}
                                </li>
                                <li>
                                    Receiver ID: {continuous.node.receiver_id}
                                </li>
                            </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                );
            }));
        }
    	
    } catch (error) {}
  }

  render() {
  	const { site, data, classes } = this.props

        return (
            <div className={classes.root}>
                {this.siteLogger(site)}
            </div>

        );
  }
}

SiteDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteDetails);