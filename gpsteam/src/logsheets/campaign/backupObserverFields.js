import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import { reduxForm, Field } from 'redux-form';
import { Paper } from '@material-ui/core';

/*
See ConLogIn to view documentation in mutations
*/

//const  { DOM: { input } } = React

const CampaignDetailsQuery = gql `
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

const CampaignDetailsFetch = {fetchPolicy: 'cache-and-network'}


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
      //console.log(observerList.includes(event.target.value))
      if(!observerList.includes(event.target.value)){
        observerList.push(event.target.value)
        
      }
      

    }else{
      if(observerList.includes(event.target.value)){
        observerList.splice(observerList.indexOf(event.target.value),1)
        
      }

    }
  }

  renderCheckbox(){
    return (this.props.data.allPersons.map((person) => {
      
      return(

        <div key={person.id}>
          <label>{person.firstName} {person.lastName}</label>
            <Field 
            name = {person.id}
            component="input"
            type="checkbox" 
            onChange={this.handleChange.bind(this)}
            />
        </div>
      )
    }))
  }

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props
    const { loading } = this.props.data
      if(loading){
        return(
          <div>
            Loading...
          </div>
        )
      }
        return ( 
          <Paper style={{maxHeight:500, 
            height:'auto', 
            overflow:'auto', 
            width:'80%', 
            textAlign:'center', 
            marginTop:10, 
            flexGrow:1, 
            overflowX:'auto'}} 
            center='true'>
            <div>
              Select Observers for Campaign Logsheet
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                {this.renderCheckbox()}
                <div>
                  <button type="submit" disabled={ pristine|| submitting }>
                    Submit
                  </button>
                  <button type="button" disabled={ pristine|| submitting } onClick={reset}>
                    Clear Values
                  </button>
                </div>
              </form>
            </div>
          </Paper>
        )   
    
  }
}

ObserverFields = reduxForm({
  form: 'ObserversValues'
})(ObserverFields)

export default graphql(CampaignDetailsQuery, {options:CampaignDetailsFetch})(ObserverFields)