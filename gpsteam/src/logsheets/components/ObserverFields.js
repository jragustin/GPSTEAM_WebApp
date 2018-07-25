import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import { reduxForm, Field } from 'redux-form';

import PropTypes from 'prop-types';
import { Slide, Dialog, DialogTitle, DialogContent, Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

/*
See ConLogIn to view documentation in mutations
*/

//const  { DOM: { input } } = React

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

let Transition = (props) =>{
  return <Slide direction="up" {...props} />;
}

class ObserverFields extends Component{
  
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
        observerList.splice(observerList.indexOf(event.target.value),1)
        console.log(observerList)
      }

    }
  }

  renderCheckbox(){
    return (this.props.data.allPersons.map((person) => {
      return(
        <div key={person.id}>
          <label>{person.firstName} {person.lastName}</label>
          
            <Field 
            name="firstName" 
            component="input" 
            type="checkbox" 
            onChange={this.handleChange.bind(this)}
            placeholder="First Name"
            id={person.id}
            value={person.id}/>
        </div>
      )
    }))
  }

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props

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
            <form onSubmit={handleSubmit}>
              {this.renderCheckbox()}
              <div>
                <button type="submit">
                  Submit
                </button>
                <button type="button" onClick={reset}>
                  Clear Values
                </button>
              </div>
            </form>
          </DialogContent>
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

ObserverFields = reduxForm({
  form: 'ObserversValues'
})(ObserverFields)

export default graphql(peoplesQuery, {options:peoplesFetch})(ObserverFields)