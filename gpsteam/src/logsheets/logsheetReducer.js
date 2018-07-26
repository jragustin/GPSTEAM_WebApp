const initialState = {
    openStep: false
}

export const logsheetReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'OPEN_NEXT':
            return {
                ...state,
                openStep: true
            }
        case 'DISABLE_NEXT':
            return {
                ...state,
                openStep: false
            }
        default:
                return state
    }
}