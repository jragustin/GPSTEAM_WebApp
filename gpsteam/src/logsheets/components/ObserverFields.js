import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types';
import { Paper, Grid, List } from '@material-ui/core';
/*
See ConLogIn to view documentation in mutations
*/

const peoplesQuery = gql `
  {
    allPersons{
      id
      firstName
    }
  }
`
const peoplesFetch = {fetchPolicy: 'cache-and-network'}
class ObserverFields extends Component {
    renderList(){
        return( this.props.data.allPersons.map((person) => {
                return(
                    <li key={person.id}>
                        {person.firstName}
                    </li>
                    );
                }
            )
        );
    }  

    render() {
      if(!this.props.show) {
        return null;
      }else{
          return ( 
            <div className="backdrop">
              <div className="modal">
                <List>
                  {this.renderList()}
                </List>
              <div className="footer">
                  <button onClick={this.props.onClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )
      }
    }
}

ObserverFields.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};
export default graphql(peoplesQuery, {options:peoplesFetch})(ObserverFields)