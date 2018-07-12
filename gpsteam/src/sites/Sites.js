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
import PropTypes from 'prop-types';

import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Paper, Modal, Button, Grid, List, TextField, Table, TableRow, TableBody, TableCell, TableHead } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from 'material-ui'

import { List as RVList, AutoSizer } from 'react-virtualized';
import SearchIcon from 'material-ui-icons/Search'
import SiteDetails from './SiteDetails'


/*
sitesQuery is a gql query that is sent to the server(graphql) 
to do the query that will get the values from the database 
sitesQuery is declared on the resolvers.js and schema.js on the server side.
the sitesQuery will run to the server which is declared in the schema to connect 
and do the allSites query in the database.
*/
const sitesQuery = gql `
	{
		allSites{
			id
			name
            dateEstablished
            latitude
            longitude
            location
            description
            createdAt
            updatedAt
            survey_type_id
            marker_id
		}
	}
`
/*
The fetch policy need to be changed so that the page will be updated. 
The default fetch policy is cache first, so the changes in here (sites) and
other components will not be seen on the client side.
*/

// indicates that the data  will be from cache and database directly
const sitesFetch = {fetchPolicy: 'cache-and-network'}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit,
  },
});


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

/*
render the sites then pass 'site' as a property to the component SiteDetails to show more details of the sites
*/
class Sites extends Component {

    renderList(){
    	return( this.props.data.allSites.map((site) => {
                return(
                    <TableRow key={site.id}>
                        <TableCell>{site.name}</TableCell>
                        <TableCell>{site.location}</TableCell>
                        <TableCell numeric><SiteDetails site={site}/></TableCell>    
                    </TableRow>
    	   			);
    	   		}
    	   	)
    	)
    }
    
    render() {
        if(this.props.data.loading) {
            return (                
                 <Grid container centered='true' align='center'>
                    <CircularProgress className={this.props.progress} thickness={7}/>
                    <Typography color='primary'>Loading...</Typography>
                </Grid>
            );
        }
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
                            <Table style={{width:'100%'}}>
                               
                                <TableBody>
    			            	{this.renderList()}
                                </TableBody>
                                
                            </Table>
    			        </Paper>
    		        </Grid>
                </Grid>
            </div>
        )
    }
}

/*
The declared constant will be added as an option configuration to the
graphql tag. If you want to learn more about this, go to:
https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-config-options
*/
export default graphql(sitesQuery, {options:sitesFetch})(Sites)





















