/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';
import ConLogMod from './ConLogMod'

const continuousLogsheetsQuery = gql `
    {
        allContinuousLogsheets{
            id
        }
    }
`

const continuousLogsheetsFetch = {fetchPolicy: 'cache-and-network'}

class ContinuousLogsheets extends Component {
    renderList(){
        console.log(this.props.data.allContinuousLogsheets)
        return( this.props.data.allContinuousLogsheets.map((continuousLogsheet) => {
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
                    <Paper style={{
                        maxHeight:'100%', 
                        overflow: 'auto',
                        textAlign:'center'
                        }} 
                        center='true'>
                        <ConLogMod/>
                        <List >
                            {this.renderList()}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

export default graphql(continuousLogsheetsQuery,{options:continuousLogsheetsFetch})(ContinuousLogsheets)