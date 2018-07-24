import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types';
import { Slide, Dialog, DialogTitle, DialogContent, Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

/*
See ConLogIn to view documentation in mutations
*/

const peoplesQuery = gql `
  {
    allPersons{
      id
      firstName
      lastName
      nickName
      birthdate
      position_id
      division_id
      site_id
      person_type_id
      non_staff_position_id
      office_location_id
    }
  }
`
const peoplesFetch = {fetchPolicy: 'cache-and-network'}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ObserverFields extends Component {
    constructor() {
      super()
      this.state = {
       observerList: [],
       checked: false
      }
    }

    handleChange(event) {
      /*
      put checked values in an array in this function
      */
      const { observerList } = this.state


      // console.log(observerList)
      if (event.target.checked) {
       // observerList = observerList.push(event.target.value)
        console.log(observerList.includes(event.target.value))
        if(!observerList.includes(event.target.value)){
          observerList.push(event.target.value)
          console.log(observerList)
        }

      }else{
        if(observerList.includes(event.target.value)){
          observerList.splice(event.target.value.index,1)
          console.log(observerList)
        }

      }
    }

    passList=()=>{
      console.log("Submitted",this.state.observerList)
    }

    renderList(){
        return( this.props.data.allPersons.map((person) => {
                return(
                    <TableRow key={person.id}>
                        <TableCell>{person.firstName} {person.lastName}</TableCell>
                        <TableCell>
                          <Checkbox color='primary'
                          onChange={this.handleChange.bind(this)}
                          value={person.firstName}/>
                        </TableCell>
                    </TableRow>
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
            <Dialog
              open
              TransitionComponent={Transition}
              keepMounted
              onClose={this.props.onClose}
              fullWidth>
                <DialogTitle>
                  Select Observers
                </DialogTitle>
                <DialogContent>
                  <Table style={{width:'100%'}}>
                      <TableBody>
                      {this.renderList()}
                      </TableBody>
                  </Table>
                </DialogContent>
                <button type="submit" onClick={this.passList}>
                  Submit
                </button>
            </Dialog>
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