/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Paper, Grid, Table, TableRow, TableBody, TableCell, } from '@material-ui/core';
import CamLogMod from './CamLogMod'

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from 'material-ui'

/*
To see the documetation on queries, see Sites.js
*/

const campaignLogsheetsQuery = gql `
	{
		allCampaignLogsheets{
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
To see the documetation on fetch, see Sites.js
*/
const campaignLogsheetsFetch = {fetchPolicy: 'cache-and-network'}

class CampaignLogsheets extends Component {
    renderList(){
    	return ( this.props.data.allCampaignLogsheets.map((campaignLogsheet) => {
    	   		return(
    	   			<TableRow key={campaignLogsheet.id}>
                        <TableCell>{campaignLogsheet.date}</TableCell>
                    </TableRow>
    	   			);
    	   		}
    	   	)
    	);
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
                        <CamLogMod/>
                        <Paper style={{maxHeight:500, 
                            height:'80%', 
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

        );
    }
}

export default graphql(campaignLogsheetsQuery, {options:campaignLogsheetsFetch})(CampaignLogsheets)