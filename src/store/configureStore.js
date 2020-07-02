import { createStore, combineReducers } from 'redux'
import profileReducer from '../reducers/profileReducer'


export default () => {
    const store = createStore(
        combineReducers({
            profile: profileReducer
            //filters: filtersReducer ADD MORE REDUCERS HERE
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}