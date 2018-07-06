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
                  Submit a Campaign Logsheets
                </button>

                <CamLogIn show={this.state.isOpen}
                    onClose={this.toggleModal}>
                    <CamLogIn/>
                </CamLogIn>
            </div>
        )
      }
}