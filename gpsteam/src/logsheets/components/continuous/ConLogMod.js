/*
This sets the state of the modal and shows the form.
It will be exported to ContinuousLogsheets.
*/

import React, { Component } from 'react'
import ConLogIn from './ConLogIn'
/*
This is the button that is responsible for 
showing the form
*/

export default class ConLogMod extends Component {

      render(){
      	return(
          <ConLogIn/>
      	)
      }
}