/*note: whenever getting data from this.props.data that came from the gql
always check if the data is still loading in order to avoid error undefined
*/

import React, { Component } from 'react'

import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Paper, Grid, Table, TableRow, TableBody, TableCell} from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from 'material-ui'

// import { List as RVList, AutoSizer } from 'react-virtualized';
// import SearchIcon from 'material-ui-icons/Search'
// import SiteDetailsSlide from './SiteDetailsSlide'


/*
sitesQuery is a gql query that is sent to the server(graphql) 
to do the query that will get the values from the database 
sitesQuery is declared on the resolvers.js and schema.js on the server side.
the sitesQuery will run to the server which is declared in the schema to connect 
and do the allSites query in the database.
*/
const sitesQuery = gql `
	{
		campaignSites{
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

/*
render the sites then pass 'site' as a property to the component SiteDetails to show more details of the sites
*/
class CampaignSites extends Component {
    _onButtonClick(){
        console.log('I do nothing yet');
    }
    renderList(){
    	return(this.props.data.campaignSites.map((site) => {
                return(

                    // <SiteDetailsSlide/>
                    <TableRow key={site.id} onClick={this._onButtonClick}>
                        <TableCell>{site.name}</TableCell>
                        <TableCell>{site.location}</TableCell>
                        {/*<TableCell numeric><SiteDetails site={site}/></TableCell>*/}
                        {/*this.state.openSiteDetails ? <SiteDetails site={site}/> : null */}    
                    </TableRow>
    	   			);
    	   		}
    	   	)
    	)
    }
    
    render() {
        if(this.props.data.loading) {
            return (
            <div>
                <Grid container centered='true' align='center'>
                    <Grid item align='center' xs={12}>
                        <Paper style={{maxHeight:500, 
                            height:'auto', 
                            overflow:'auto', 
                            width:'80%', 
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
                            height:'auto', 
                            overflow:'auto', 
                            width:'80%', 
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
export default graphql(sitesQuery, {options:sitesFetch})(CampaignSites)





















