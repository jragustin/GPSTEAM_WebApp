/*There is a bug here. You will get an error that this.props.data.sites will become when you open it to a private browser*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';


const sitesQuery = gql `
	{
		sites{
			id
			name
		}
	}
`


class Sites extends Component {

    renderList(){
    	console.log(this.props.data.sites)
    	return( this.props.data.sites.map((site) => {
    	   		return(
    	   			<li key={site.id}>
    	   				{site.name}
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

export default graphql(sitesQuery)(Sites)