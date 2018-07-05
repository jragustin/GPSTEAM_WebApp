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
	constructor(props) {
        super(props);

        this.state = { isOpen: false };
      }


      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render(){
      	return(

      		<div>
      			<button onClick={this.toggleModal}>
                  Submit a Continuous Logsheets
                </button>

                <ConLogIn show={this.state.isOpen}
                	onClose={this.toggleModal}>
                	<ConLogIn/>
                </ConLogIn>
      		</div>
      	)
      }
}