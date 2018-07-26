
import { homeReducer } from '../home/homeReducer'
import { mapReducer } from '../map/mapReducer'
import { logsheetReducer } from '../logsheets/logsheetReducer'
/*this is the rootReducer that gathers all the reducers we have*/
export const rootReducers = {
    home: homeReducer,
    map: mapReducer,
    logsheet: logsheetReducer
}