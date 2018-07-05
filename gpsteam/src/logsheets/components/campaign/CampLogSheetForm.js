import React, { Component } from 'react'
// import { Form, Input, TextArea, Button, Grid } from 'semantic-ui-react'
import { Button, Paper, Grid, TextField } from '@material-ui/core';


const style = {
    Paper: { spacing: 10, padding:20, marginTop:10, marginBottom:10 },
    width: { width:110, spacing: 5, padding:10, marginTop:10, marginBottom:10 } };

export default class CampLogSheetForm extends Component {
    render() {
        return (
            <Grid container>
                <Grid item sm>
                    <Paper style={style.Paper}>
                        <Grid item xs>
                            <TextField 
                                id='date' 
                                label='date' 
                                type='date' 
                                defaultValue='2018-01-01' 
                                fullWidth='true' 
                                textAlign='center'
                                />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='north_meter' 
                                label='height north meters' 
                                margin='normal' 
                                type='number'
                                style= {style.width}/>
                            <TextField 
                                id='south_meter' 
                                label='height south meters' 
                                margin='normal'  
                                type='number'
                                style= {style.width}/>
                            <TextField 
                                id='east_meter' 
                                label='height east meters' 
                                margin='normal'  
                                type='number'
                                style= {style.width}/>
                            <TextField 
                                id='west_meter' 
                                label='height west meters' 
                                margin='normal' 
                                type='number'
                                style= {style.width}/>
                                <br/>
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='time_start' 
                                label='Time Start' 
                                type='time' defaultValue="7:30"
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='time_end' 
                                label='Time End' 
                                type='time' 
                                defaultValue='7:30'
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='time_failure' 
                                label='Failure Time' 
                                type='time' 
                                defaultValue='7:30'
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                            /><br/>
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='azimuth' 
                                label='azimuth' 
                                type='number' 
                                defaultValue='0' 
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='note' 
                                label='notes' 
                                type='text'                 
                                fullWidth='true'
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='createdAt' 
                                label='created at' 
                                type='datetime-local' defaultValue="2017-01-01T7:30"
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='site_id' 
                                label='Site ID'                 
                                halfWidth='true'
                                fullWidth='true'
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='antenna_id' 
                                label='Antenna ID'                  
                                margin='normal'
                                fullWidth='true'
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField 
                                id='receiver_id' 
                                label='Receiver ID'                     
                                margin='normal'
                                fullWidth='true'
                            />
                        </Grid>
                            <Button color='primary' >
                            Save
                            </Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


/*
  `date` datetime NOT NULL,
  `height_north_meters` double NOT NULL,
  `height_east_meters` double NOT NULL,
  `height_south_meters` double NOT NULL,
  `height_west_meters` double NOT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `failure_time` time DEFAULT NULL,
  `azimuth` float DEFAULT NULL,
  `notes` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `site_id` int(11) DEFAULT NULL,
  `antenna_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL
*/
