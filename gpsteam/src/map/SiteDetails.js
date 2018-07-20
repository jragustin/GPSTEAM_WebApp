/*
This file will contain all the logsheets of the site clicked.
It will only be available for viewing (Read), but if the user wants to
edit or delete a file, he must go to the sites tab.
*/

import React, { Component }  from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Paper, Grid } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from 'material-ui'
// import PropTypes from 'prop-types';

const sitesCampaignLogsheets = gql `
	query sitesCampaignLogsheets($site_id: ID) {
		sitesCampaignLogsheets(site_id:$site_id){
			id
            date
            heightNorthMeters
            heightEastMeters
            heightSouthMeters
            heightWestMeters
            timeStart
            timeEnd
            failureTime
            azimuth
            notes
            site_id
            antenna_id
            receiver_id 
		}
	}
	
`

/*
const continuousLogsheetsQuery = gql `
    {
        sitesContinuousLogsheets(site_id:ID){
            id
            isPowerOn
            date
            batteryCondition
            chargerCondition
            otherNotes
            createdAt
            site_id:
            antenna_id
            receiver_id
        }
    }
`*/
const siteDetailsFetch = {fetchPolicy: 'cache-and-network'}

class SiteDetails extends Component {
  
  siteLogger(site){
    try {
    	console.log(site)
        if (site.surveyType.type === 'campaign') {
            return(
                <div>    
                    {site.name}
                </div>
            );
              
        }
        return(
            <div>    
                {site.name}
            </div>
        );
    	
    } catch (error) {
       	// console.log('Disregard this error: ',error)
    }
  }

  render() {
  	const { site, data } = this.props

  	if(data.loading) {
            return (                
                <div>
                    <Grid container centered='true' align='center'>
                        <Grid item align='center' xs={12}>
                            <Paper style={{maxHeight:500, 
                                height:'auto', 
                                overflow:'auto', 
                                width:'60%', 
                                textAlign:'center', 
                                marginTop:10, 
                                flexGrow:1, 
                                overflowX:'auto'}} 
                                center='true'>
                                
                                <CircularProgress className={this.props.progress} thickness={7}/>
                                <Typography color='primary'>Loading...</Typography>
                                
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        
        return (
            <div>
                <Grid container centered='true' align='center'>
                    <Grid item align='center' xs={12}>
                        <Paper style={{maxHeight:500, 
                            height:'80%', 
                            overflow:'auto', 
                            width:'60%', 
                            textAlign:'center', 
                            marginTop:10, 
                            flexGrow:1, 
                            overflowX:'auto'}} 
                            center='true'>
                                {this.siteLogger(site)}
                        </Paper>
                    </Grid>
                </Grid>
            </div>

        );
  }
}

export default graphql(sitesCampaignLogsheets, {options:siteDetailsFetch})(SiteDetails)