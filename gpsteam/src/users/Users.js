import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid, List } from '@material-ui/core';


const usersQuery = gql `
	{
		allUsers{
			id
			username
		}
	}
`

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


export default graphql(usersQuery)(Users)