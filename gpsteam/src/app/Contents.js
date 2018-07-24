import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Map from '../map/MapContainer'
import Sites from '../sites/Sites'
import Logsheets from '../logsheets/Logsheets'
import Users from '../users/Users'
import Equipments from '../equipments/Equipments'

export default class Contents extends Component {
    render() {
        const { classes } = this.props

        return (
            <main className={classes.content}>
            {/*<Route> from the component to the path(like "localhost:3000/dash/map") renders the UI */}
                
                <Route path='/dash/map' component={Map} />
                <Route path='/dash/sites' component={Sites} /> 
                <Route path='/dash/logsheets' component={Logsheets} /> 
                <Route path='/dash/equipments' component={Equipments} /> 
                <Route path='/dash/users' component={Users} />                
            </main>
        )
    }
}
