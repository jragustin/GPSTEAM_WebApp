const initialState = {
    selectedSite: null,
    showCampaignSites: true,
    showContinuousSites: true,
    showFaultLines: false,
    drawerOpen: false,
    detailsOpen: false,
    enableCluster: true,
    position: [ 12.8797,  121.7740 ],
    zoom: 6
}

export const mapReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_SELECTED_SITE':
            return {
                ...state,
                selectedSite: action.payload
            }
        case 'TOGGLE_SHOWCAMPAIGNSITES':
            return {
                ...state,
                showCampaignSites: !state.showCampaignSites
            }
        case 'TOGGLE_SHOWCONTINUOUSSITES':
            return {
                ...state,
                showContinuousSites: !state.showContinuousSites
            }
        case 'TOGGLE_SHOWFAULTLINES':
            return {
                ...state,
                showFaultLines: !state.showFaultLines
            }
        case 'OPEN_DRAWER':
            return {
                ...state,
                drawerOpen: true
            }
        case 'CLOSE_DRAWER':
            return {
                ...state,
                drawerOpen: false
            }
        case 'OPEN_DETAILS':
            return {
                ...state,
                detailsOpen: true
            }
        case 'CLOSE_DETAILS':
            return {
                ...state,
                detailsOpen: false
            }
        case 'SET_ZOOM': 
            return {
                ...state,
                zoom: action.payload
            }
        case 'SET_POSITION': 
            return {
                ...state,
                position: action.payload
            }
        default:
                return state
    }
}