/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';
import CamLogMod from './CamLogMod'

const campaignLogsheetsQuery = gql `
	{
		allCampaignLogsheets{
			id
		}
	}
`

class CampaignLogsheets extends Component {
    renderList(){
    	console.log(this.props.data.allCampaignLogsheets)
        /*
        Object { id: "1", heightNorthMeters: 1.45, __typename: "CampaignLogsheet", … }
        */
    	return( this.props.data.allCampaignLogsheets.map((campaignLogsheet) => {
    	   		return(
    	   			<li key={campaignLogsheet.id}>
    	   				{campaignLogsheet.id}
    	   			</li>
    	   			);
    	   		}
    	   	)
    	);
    }

    render() {
        return (
        	<Grid container centered='true' align='center'>
		    	<Grid item align='center' xs={12}>
			        <Paper style={{
                        maxHeight:'100%', 
                        overflow: 'auto',
                        textAlign:'center'
                        }} 
                        center='true'>
			            <CamLogMod/>
			            <List >
			            	{this.renderList()}
			            </List>
			        </Paper>
		        </Grid>
            </Grid>

        );
    }
}

export default graphql(campaignLogsheetsQuery)(CampaignLogsheets)