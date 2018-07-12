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
//ConLogForm is Continuous Logsheet Form
let ConLogForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  
  return <form onSubmit={handleSubmit}>
      <div>
        <label>Observers</label>
        <div>
          <ObsFieldMod/>
        </div>
      </div>
      <div>
        <label>Power</label>
        <div>
          <Field
            name="is_power_on"
            component="input"
            type="number" min={0} max={1}
            placeholder="1 or 0"
          />
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
        <label>Battery Condition</label>
        <div>
          <Field
            name="battery_condition"
            component="input"
            type="text"
            placeholder="Describe Battery Condition"
          />
        </div>
      </div>
       <div>
        <label>Charger Condition</label>
        <div>
          <Field
            name="charger_condition"
            component="input"
            type="text"
            placeholder="Describe Charger Condition"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field 
          name="other_notes" 
          component="textarea"
          />
        </div>
      </div>
      <div>
        <label>Creation Date</label>
        <div>
          <Field
          name="createdAt"
          showTime={false}
          component={renderDateTimePicker}
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
ConLogForm = reduxForm({
  form: 'ConLogFormValues'
})(ConLogForm)

export default ConLogForm