/*
This sets the state of the modal and shows the form.
*/

import React, { Component } from 'react'
import ObserverFields from './ObserverFields'

/*
This is the button that is responsible for 
showing the form
*/
export default class ObsFieldMod extends Component {
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
      			<button type="button" onClick={this.toggleModal}>
              Select Observers
            </button>

            <ObserverFields show={this.state.isOpen}
            	onClose={this.toggleModal}>
            	<ObserverFields/>
            </ObserverFields>
      		</div>
      	)
      }
}