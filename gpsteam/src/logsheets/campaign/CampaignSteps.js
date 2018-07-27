import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

import CampaignLogsheetInput from '../campaign/CampaignLogsheetInput';
import ObserverFieldsInput from './ObserverFieldsInput';

import { connect } from 'react-redux'
import * as logsheetActions from '../logsheetActions'  

const styles = theme => ({
  root: {
    width: '90%',
    overflow:'scroll'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Fill out Details', 'Select Campaign Observers', 'Select Campaign Contacts'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <CampaignLogsheetInput/>;
    case 1:
      return <ObserverFieldsInput/>;
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}

class CampaignSteps extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { openStep } = this.props;
    const { activeStep } = this.state;
    
    if (openStep === true) {
      this.setState({
        activeStep: activeStep + 1,

      });
      this.props.disableNext()
    }
    else{
      alert("You cannot proceed yet!")
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,

    });
    this.props.disableNext()

  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    
    return (
      <div className={classes.root}>
      <Paper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
        </Paper>
      </div>
    );
  }
}

CampaignSteps.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { ...state.logsheet }
}

CampaignSteps = connect(mapStateToProps, { ...logsheetActions })(CampaignSteps)


export default withStyles(styles)(CampaignSteps);