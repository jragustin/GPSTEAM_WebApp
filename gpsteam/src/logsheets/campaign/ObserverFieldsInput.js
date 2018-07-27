/*
This sets the state of the modal and shows the form.
*/

import React, { Component } from 'react'

import { compose } from 'react-compose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import ObserverFields from './ObserverFields'

import { connect } from 'react-redux'
import * as logsheetActions from '../logsheetActions' 

const CampaignDetailsQuery = gql `
  {
    lastCampaignLogsheet{
      id
    }
  }
`
const createCampaignObservers = gql`
  mutation createCampaignObservers( $campaign_logsheet_id: Int!, $person_id: Int! ){
    createCampaignObservers( campaign_logsheet_id: $campaign_logsheet_id, person_id: $person_id ){  
      id
    }
  }
`

const CampaignDetailsFetch = {fetchPolicy: 'cache-and-network'}

class ObserverFieldsInput extends Component {
  submitObservers =(values) =>{
    const { data } = this.props
    var key
    for (key in values){
        if (values[key] === true) {  
          console.log(data);
          this.props.createCampaignObservers({
            variables:{
              campaign_logsheet_id: 1,
              person_id: key
            }
          }).then(({data}) => {
            // if data from mutation is returned, submit success!
            // this.props.refetch();
            this.props.openNext()
            alert("Submit success!");
          }).catch(error =>{
            this.props.disableNext()
            alert("Cannot proceed...\nSubmit unsuccessful!");
            console.log(error);
          })
        }
    }
  }

  render(){
    return(
      <div>
        <ObserverFields onSubmit={this.submitObservers.bind(this)}>
        </ObserverFields>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.logsheet }
}

ObserverFieldsInput = connect(mapStateToProps, { ...logsheetActions })(ObserverFieldsInput)

/*export default compose(
    graphql(CampaignDetailsQuery, {options:CampaignDetailsFetch}),
    graphql(createCampaignObservers,{name:"createCampaignObservers"})
    )(ObserverFieldsInput)*/
export default graphql(createCampaignObservers,{name:"createCampaignObservers"})(ObserverFieldsInput)