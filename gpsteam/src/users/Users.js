import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from 'material-ui'

/*
To see the documetation on queries, see Sites.js
*/
const usersQuery = gql `
	{
		allUsers{
			id
			username
		}
	}
`
/*
To see the documetation on fetch, see Sites.js
*/
const usersFetch = {fetchPolicy: 'cache-and-network'}

class Users extends Component {
	renderList() {
		console.log(this.props.data.allUsers)
		return this.props.data.allUsers.map((user) => {
			return(
				<li key={user.id}>
					{user.username}				
				</li>
				);
			}
		);
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
        	<Grid container centered='true' align='center'>
	        	<Grid item align='center' xs={12}>
		            <Paper style={{
                        maxHeight:'100%', 
                        overflow: 'auto',
                        textAlign:'center'
                        }} 
                        center='true'>
			            <List>
			                {this.renderList()}
			            </List>
		            </Paper>
	            </Grid>
	        </Grid>
        )
    };
}


export default graphql(usersQuery, {options:usersFetch})(Users)