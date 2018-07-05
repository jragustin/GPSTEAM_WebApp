/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const campaignLogsheetsQuery = gql `
	{
		campaignLogsheets{
			id
		}
	}
`

class CampaignLogsheets extends Component {

    renderList(){
    	console.log(this.props.data.campaignLogsheets)
    	return( this.props.data.campaignLogsheets.map((campaignLogsheet) => {
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
			        <Paper style={{maxHeight:500, overflow:'auto', width:1000, textAlign:'center', marginTop:20}} center='true'>
			            
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