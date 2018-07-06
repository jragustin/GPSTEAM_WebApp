import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Paper, Grid } from '@material-ui/core';


const usersQuery = gql `
	{
		users{
			id
			username
		}
	}
`

class Users extends Component {
    
	renderList() {
		console.log(this.props.data.users)
		return this.props.data.users.map((user) => {
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
        	<Grid container style = {{alignItems: 'center'}}>
	            <Paper style={{maxHeight:500, overflow:'auto', width:1000, textAlign:'center', marginTop:20}} center='true'>
	            <ul>
	                {this.renderList()}
	            </ul>
	            </Paper>
            </Grid>
        )
    };
}


export default graphql(usersQuery)(Users)