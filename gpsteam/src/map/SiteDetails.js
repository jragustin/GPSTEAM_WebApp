/*
This file will contain all the logsheets of the site clicked.
It will only be available for viewing (Read), but if the user wants to
edit or delete a file, he must go to the sites tab.
*/

import React, { Component }  from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Typography, ListItem, List } from '@material-ui/core'

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
            const { site, classes } = this.props
            return( site.campaignLogsheets.edges.map((campaign) => {
                return (
                      <ExpansionPanel key={campaign.node.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>{campaign.node.date}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                <ListItem>
                                    Date: {campaign.node.date}
                                </ListItem>
                                <ListItem>
                                    Height North Meters: {campaign.node.heightNorthMeters}
                                </ListItem>
                                <ListItem>
                                    Height East Meters: {campaign.node.heightEastMeters}
                                </ListItem>
                                <ListItem>
                                    Height South Meters: {campaign.node.heightSouthMeters}
                                </ListItem>
                                <ListItem>
                                    Height West Meters: {campaign.node.heightWestMeters}
                                </ListItem>
                                <ListItem>
                                    Time Started: {campaign.node.timeStart}
                                </ListItem>
                                <ListItem>
                                    Time Finished: {campaign.node.timeEnd}
                                </ListItem>
                                <ListItem>
                                    Failure Time: {campaign.node.failureTime}
                                </ListItem>
                                <ListItem>
                                    Azimuth: {campaign.node.azimuth}
                                </ListItem>
                                <ListItem>
                                    Notes: {campaign.node.notes}
                                </ListItem>
                                <ListItem>
                                     Antenna ID: {campaign.node.antenna_id}
                                </ListItem>
                                <ListItem>
                                    Receiver ID: {campaign.node.receiver_id}
                                </ListItem>
                            </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                );
            }));
        }else{
            const { site, classes } = this.props
            return( site.continuousLogsheets.edges.map((continuous) => {
                return (
                      <ExpansionPanel key={continuous.node.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>{continuous.node.date}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                <ListItem>
                                    Date: {continuous.node.date}
                                </ListItem>
                                <ListItem>
                                    Is On: {continuous.node.isPowerOn}
                                </ListItem>
                                <ListItem>
                                    Battery Condtion: {continuous.node.batteryCondition}
                                </ListItem>
                                <ListItem>
                                    Charger Condition: {continuous.node.chargerCondition}
                                </ListItem>
                                <ListItem>
                                    Other Notes: {continuous.node.otherNotes}
                                </ListItem>
                                <ListItem>
                                    Created at: {continuous.node.createdAt}
                                </ListItem>
                                <ListItem>
                                     Antenna ID: {continuous.node.antenna_id}
                                </ListItem>
                                <ListItem>
                                    Receiver ID: {continuous.node.receiver_id}
                                </ListItem>
                            </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                );
            }));
        }
    	
    } catch (error) {}
  }

  render() {
  	const { site, classes } = this.props

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