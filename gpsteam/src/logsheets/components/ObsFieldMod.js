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

  submitObservers =(values) =>{
      console.log(values)
    }


  render(){
  	return(
  		<div>
  			<button type="button" onClick={this.toggleModal}>
          Select Observers
        </button>
        <ObserverFields
          onSubmit={this.submitObservers.bind(this)}
          show={this.state.isOpen}
        	onClose={this.toggleModal}
          >
        </ObserverFields>
      </div>
  	)
  }
}