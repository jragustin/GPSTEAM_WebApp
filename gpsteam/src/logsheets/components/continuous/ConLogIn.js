import React, { Component } from 'react'
import ConLogMod from './ConLogMod'

export default class ConLogIn extends Component {
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

                <ConLogMod show={this.state.isOpen}
                 onClose={this.toggleModal}>
                	<ConLogMod/>
                </ConLogMod>
      		</div>
      	)
      }
}