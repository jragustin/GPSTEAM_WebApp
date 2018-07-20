const initialState = {
    showAllSites: true,
    showContinuousSites: false,
    showCampaignSites: false,
    selectSite:false
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
        case 'TOGGLE_SHOWALLSITES':
            return {
                ...state,
                showAllSites: !state.showAllSites
            }

        default:
                return state
    }
}