export const setSelectedSite = (site) => ({
    type: 'SET_SELECTED_SITE',
    payload: site
})

export const toggleShowCampaignSites = () => ({
    type: 'TOGGLE_SHOWCAMPAIGNSITES'
})

export const toggleShowContinuousSites = () => ({
    type: 'TOGGLE_SHOWCONTINUOUSSITES'
})

export const toggleShowFaultLines = () => ({
    type: 'TOGGLE_SHOWFAULTLINES'
})

export const openDrawer = () => ({
    type: 'OPEN_DRAWER'
})

export const closeDrawer = () => ({
    type: 'CLOSE_DRAWER'
})

export const openDetails = () => ({
    type: 'OPEN_DETAILS'
})

export const closeDetails = () => ({
    type: 'CLOSE_DETAILS'
})

export const setZoom = (zoom) => ({
    type: 'SET_ZOOM',
    payload: zoom
})

export const setPosition = (position) => ({
    type: 'SET_POSITION',
    payload: position
})
