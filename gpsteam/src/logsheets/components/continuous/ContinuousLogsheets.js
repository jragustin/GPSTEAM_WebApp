/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';
// import CamLogMod from './CamLogMod'

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
        /*
        Why is the typename different? It should be ContinuousLogsheet with a capital C
        Object { id: "Y29udGludW91c0xvZ3NoZWV0OjEy", __typename: "continuousLogsheet", … }
        */
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
                    <Paper style={{
                        maxHeight:'100%', 
                        overflow: 'auto',
                        textAlign:'center'
                        }} 
                        center='true'>
                        {/*<CamLogMod/>*/}
                        <List >
                            {this.renderList()}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

export default graphql(continuousLogsheetsQuery)(ContinuousLogsheets)