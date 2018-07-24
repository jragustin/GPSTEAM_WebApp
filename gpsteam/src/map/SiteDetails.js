/*
This file will contain all the logsheets of the site clicked.
It will only be available for viewing (Read), but if the user wants to
edit or delete a file, he must go to the sites tab.
*/

import React, { Component }  from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Paper, Grid, Table, TableRow, TableBody, TableCell } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from 'material-ui'

class SiteDetails extends Component {
  
  siteLogger(site){
    try {
    	
        if (site.surveyType.type === 'campaign') {
            return( site.campaignLogsheets.edges.map((campaign) => {
                return(

                    <TableRow key={campaign.node.id}>
                        <TableCell>{campaign.node.date}</TableCell>
                    </TableRow>
                    );
                }
            ));    
        }
        return( site.continuousLogsheets.edges.map((continuous) => {
            return(

                <TableRow key={continuous.node.id}>
                    <TableCell>{continuous.node.date}</TableCell>
                </TableRow>
                );
            }
        ));
    	
    } catch (error) {}
  }

  render() {
  	const { site, data } = this.props

        return (
            <div>
                <Grid container centered='true' align='center'>
                    <Grid item align='center' xs={12}>
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
                                    {this.siteLogger(site)}
                                </TableBody>

                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

        );
  }
}

export default (SiteDetails)