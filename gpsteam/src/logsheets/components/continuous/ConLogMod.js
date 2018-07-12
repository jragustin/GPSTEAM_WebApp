/*
This sets the state of the modal and shows the form.
It will be exported to ContinuousLogsheets.
*/

import React, { Component } from 'react'
import ConLogIn from './ConLogIn'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


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
              <Button 
                variant="fab" 
                color="primary" 
                aria-label="add" 
                className={this.props.button} 
                onClick={this.toggleModal}>
                  <AddIcon />
              </Button>
              <ConLogIn show={this.state.isOpen}
                  onClose={this.toggleModal}>
              </ConLogIn>
            </div>
      	)
      }
}