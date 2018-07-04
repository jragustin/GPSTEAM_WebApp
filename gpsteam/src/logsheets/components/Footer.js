import React, { Component } from 'react'
import {Tabs, Tab, Paper} from '@material-ui/core' 

export default class Logsheets extends Component {
    render() {
        return (
            <Paper>
            	<Tabs
            		value={0}
            		indicatorColor="primary"
            		textColor="primary"
            		centered
            	>
            	<Tab label="Campaign"/>
            	<Tab label="Continuous"/>
            	</Tabs>
            </Paper>
        )
    }
}
