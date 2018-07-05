/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';
import ConLogIn from './ConLogIn'

const continuousLogsheetsQuery = gql `
	{
		continuousLogsheets{
			id
            
		}
	}
`

class ContinuousLogsheets extends Component {
    

    renderList(){
    	console.log(this.props.data.continuousLogsheets)
    	return( this.props.data.continuousLogsheets.map((continuousLogsheet) => {
    	   		return(
    	   			<li key={continuousLogsheet.id}>
    	   				{continuousLogsheet.id}
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
                            <ConLogIn/>
			            	{this.renderList()}
			            </List>
			        </Paper>
		        </Grid>
            </Grid>

        );
    }
}

export default graphql(continuousLogsheetsQuery)(ContinuousLogsheets)