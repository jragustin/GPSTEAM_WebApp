/*For the bug (is not a property), refer to Sites.js*/

import React, { Component } from 'react'
import CamLogMod from './CamLogMod'

const campaignLogsheetsFetch = {fetchPolicy: 'cache-and-network'}

class CampaignLogsheets extends Component {
    render() {
        return (
            <CamLogMod/>
        );
    }
}

export default (CampaignLogsheets)