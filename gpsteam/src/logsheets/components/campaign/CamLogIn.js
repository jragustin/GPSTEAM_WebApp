import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import CamLogForm from './CamLogForm';

/*
See ConLogIn to view documentation in mutations
*/
const createCampaignLogsheet = gql`
  mutation createCampaignLogsheet($date: String!, $heightNorthMeters: Float!, $heightEastMeters: Float!, $heightSouthMeters: Float!, $heightWestMeters: Float!, $timeStart: String, $timeEnd: String, $failureTime: String, $azimuth: Float, $notes: String, $site_id: Int, $antenna_id: Int, $receiver_id: Int){
    createCampaignLogsheet(date: $date, heightNorthMeters: $heightNorthMeters, heightEastMeters: $heightEastMeters, heightSouthMeters: $heightSouthMeters, heightWestMeters: $heightWestMeters, timeStart: $timeStart, timeEnd: $timeEnd, failureTime: $failureTime, azimuth: $azimuth, notes: $notes, site_id: $site_id, antenna_id: $antenna_id, receiver_id: $receiver_id){
      id
    }
  }
`
class CamLogIn extends Component {
    
    submitForm =(values) => {
      /*
    the values inserted here came from the camLogForm imported above.
    these are identified by the props "name" of the field of the redux form
    */
      this.props.createCampaignLogsheet({
        variables:{
          date: new Date(values.date),
          heightNorthMeters: values.height_north_meters,
          heightEastMeters: values.height_east_meters,
          heightSouthMeters: values.height_south_meters,
          heightWestMeters: values.height_west_meters,
          timeStart: values.time_start,
          timeEnd: values.time_end,
          failureTime: values.failure_time,
      	  azimuth: values.azimuth,
      	  notes: values.notes,
      	  site_id: values.site_id,
      	  antenna_id: values.antenna_id,
  	      receiver_id: values.receiver_id	  

        }
      }).then(({data}) => {
        //if data from mutation is returned, refetch here!
        alert("Submit success!");
      }).catch(error =>{
        alert("Submit unsuccessful!");
        console.log(error);
      })
    }

    render() {
        return ( 
          <CamLogForm onSubmit={this.submitForm.bind(this)} />
        )
    }
}

export default graphql(createCampaignLogsheet,{
  name:"createCampaignLogsheet"
})(CamLogIn)