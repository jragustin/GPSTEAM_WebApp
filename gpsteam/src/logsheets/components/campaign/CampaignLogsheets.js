/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';
import CamLogMod from './CamLogMod'

/*
To see the documetation on queries, see Sites.js
*/
const campaignLogsheetsQuery = gql `
	{
		allCampaignLogsheets{
			id
		}
	}
`
/*
To see the documetation on fetch, see Sites.js
*/
const campaignLogsheetsFetch = {fetchPolicy: 'cache-and-network'}

class CampaignLogsheets extends Component {
    renderList(){
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

export default graphql(campaignLogsheetsQuery, {options:campaignLogsheetsFetch})(CampaignLogsheets)