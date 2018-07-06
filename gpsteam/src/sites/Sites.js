/*
There is a bug here when opened...
Sometimes it becomes an error, however
if you rearrange 
    "return this.props.data.sites.map((site) => {"
to
    "return 
        this.props.data.sites.map((site) => {"

then save and wait for reload then change back to

    "return this.props.data.sites.map((site) => {"

it's all well and good. It doesn't make sense I know
but just do it
*/

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
			        <Paper style={{
                        maxHeight:'100%', 
                        overflow: 'auto',
                        textAlign:'center'
                        }} 
                        center='true'>
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