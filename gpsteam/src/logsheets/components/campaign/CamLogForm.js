/*
This file will import all individual sub-components
in order to properly handle all inputs.
It will be passed to ConLogIn wherein the values will be handled  
and uploaded to the database.
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';


/*
These are for dates
*/
import ObsFieldMod from '../ObsFieldMod'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css'
import { Paper, Slide, Dialog, DialogTitle, DialogContent, Grid } from '@material-ui/core';

momentLocaliser(moment)


const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="MMM DD YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />


/*
For more info: https://redux-form.com/6.1.0/examples/simple/
*/

//CamLogForm is Continuous Logsheet Form
let CamLogForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return <form onSubmit={handleSubmit}>
         <div>
          <label>Observers</label>
          <div>
            <ObsFieldMod/>
          </div>
        </div>
        <div>
          <label>Date</label>
          <div>
            <Field
            name="date"
            showTime={false}
            component={renderDateTimePicker}
          />
          </div>
        </div>
         <div>
          <label>Height North (meters)</label>
          <div>
            <Field
              name="height_north_meters"
              component="input"
              type='number' step={0.001} min={0}
              placeholder="Input height in North"
            />
          </div>
        </div>
        <div>
          <label>Height East (meters)</label>
          <div>
            <Field
              name="height_east_meters"
              component="input"
              type='number' step={0.001} min={0}
              placeholder="Input height in East"
            />
          </div>
        </div>
        <div>
          <label>Height South (meters)</label>
          <div>
            <Field
              name="height_south_meters"
              component="input"
              type='number' step={0.001} min={0}
              placeholder="Input height in South"
            />
          </div>
        </div>
        <div>
          <label>Height West (meters)</label>
          <div>
            <Field
              name="height_west_meters"
              component="input"
              type='number' step={0.001} min={0}
              placeholder="Input height in West"
            />
          </div>
        </div>
        <div>
          <label>Time Start</label>
          <div>
            <Field
              name="time_start"
              component="input"
              type="time"
            />
          </div>
        </div>
        <div>
          <label>Time End</label>
          <div>
            <Field
              name="time_end"
              component="input"
              type="time"
            />
          </div>
        </div>
        <div>
          <label>Failure Time</label>
          <div>
            <Field
              name="failure_time"
              component="input"
              type="time"
            />
          </div>
        </div>
        <div>
          <label>Azimuth</label>
          <div>
            <Field
              name="azimuth"
              component="input"
              type='number' step={0.1} min={0}
            />
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field
              name="notes"
              component="textarea"
            />
          </div>
        </div>
        <div>
          <label>Site ID</label>
          <div>
            <Field
              name="site_id"
              component="input"
              type="number" min={0}
              placeholder="Site ID number"
            />
          </div>
        </div>
        <div>
          <label>Antenna ID</label>
          <div>
            <Field
              name="antenna_id"
              component="input"
              type="number" min={0}
              placeholder="Antenna ID number"
            />
          </div>
        </div>
        <div>
          <label>ReceiverID</label>
          <div>
            <Field
              name="receiver_id"
              component="input"
              type="number" min={0}
              placeholder="Receiver ID number"
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
  		</form>
}
CamLogForm = reduxForm({
  form: 'CamLogFormValues'
})(CamLogForm)

export default CamLogForm