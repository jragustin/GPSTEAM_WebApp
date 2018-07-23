/*
This sets the state of the modal and shows the form.
It will be exported to CampaignLogsheets.
*/

import React, { Component } from 'react'
import CamLogIn from './CamLogIn'
/*
This is the button that is responsible for 
showing the form
*/

export default class CamLogMod extends Component {

      render(){
        return(
          <CamLogIn/>
        )
      }
}