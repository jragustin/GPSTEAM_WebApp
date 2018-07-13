/*
ConLogIn will be uploaded to the ConLogMod where it will show the modal
and the form in ConLogForm which was imported herre will be displayed.
(headache)
*/
import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import ConLogForm from './ConLogForm';
import PropTypes from 'prop-types';

import { Slide, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

/*
to define what types of values are coming in, we need to 
put $(value_name):(value_type).

In the example below:
  mutation createContinuousLogsheet($isPowerOn:Int!,..., $receiver_id: Int){ <= contains the values to be filled and their types, and relevance(required! or not)
    createContinuousLogsheet(isPowerOn:$isPowerOn,...,receiver_id: $receiver_id){ <= the variable name as described in the schema, and the values got
      id <= an identifier for the logsheet to be identified uniquely
    }
  }
*/
const createContinuousLogsheet = gql`
  mutation createContinuousLogsheet($isPowerOn:Int!, $date:String, $batteryCondition:String, $chargerCondition:String, $otherNotes:String, $createdAt:String!, $site_id:Int, $antenna_id:Int, $receiver_id: Int){
    createContinuousLogsheet(isPowerOn:$isPowerOn, date:$date, batteryCondition:$batteryCondition, chargerCondition:$chargerCondition, otherNotes:$otherNotes, createdAt:$createdAt, site_id:$site_id, antenna_id:$antenna_id, receiver_id: $receiver_id){
      id
    }
  }
`
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

/*
This ConLogIn is a component which is shown in a modal.
*/
class ConLogIn extends Component {
    
    submitForm =(values) => {
      /*
    the values inserted here came from the conLogForm imported above.
    these are identified by the props "name" of the field of the redux form
    */
      this.props.createContinuousLogsheet({
        variables:{
          isPowerOn: values.is_power_on,
          date: new Date(values.date),
          batteryCondition: values.battery_condition,
          chargerCondition: values.charger_condition,
          otherNotes: values.other_notes,
          createdAt: values.createdAt,
          site_id: values.site_id,
          antenna_id: values.antenna_id,
          receiver_id: values.receiver_id
        }
      }).then(({data}) => {
        // if data from mutation is returned, submit success!
        // this.props.refetch();
        alert("Submit success!");
      }).catch(error =>{
        alert("Submit unsuccessful!");
        console.log(error);
      })
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
                  Fill out Campaign Logsheet
                </DialogTitle>
                <DialogContent>
                  <ConLogForm onSubmit={this.submitForm.bind(this)} />
                </DialogContent>
            </Dialog>
          )
      }
    }
}

ConLogIn.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};
export default graphql(createContinuousLogsheet,{
  name:"createContinuousLogsheet"
})(ConLogIn)