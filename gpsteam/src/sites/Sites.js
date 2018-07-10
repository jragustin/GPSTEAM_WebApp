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

/*
sitesQuery is declared on the resolvers.js and schema.js on the server side.
the sitesQuery will run to the server which is declared in the schema to connect 
and do the allSites query in the database.
*/
const sitesQuery = gql `
	{
		allSites{
			id
			name
		}
	}
`
/*
The fetch policy need to be changed so that the page will be updated. 
The default fetch policy is cache first, so the changes in here (sites) and
other components will not be seen on the client side.
*/
const sitesFetch = {fetchPolicy: 'cache-and-network'}

class Sites extends Component {
    renderList(){
    	console.log(this.props.data.allSites)
    	return( this.props.data.allSites.map((site) => {
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

/*
The declared constant will be added as an option configuration to the
graphql tag. If you want to learn more about this, go to:
https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-config-options
*/
export default graphql(sitesQuery, {options:sitesFetch})(Sites)





















