import React, { Component } from 'react'
import CampLogSheetForm from './components/CampLogSheetForm';
import Footer from './components/Footer';

export default class Logsheets extends Component {
    render() {
        return (
            <div>
                <CampLogSheetForm/>
                <Footer/>
            </div>
        )
    }
}
