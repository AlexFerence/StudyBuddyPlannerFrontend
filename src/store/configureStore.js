import { createStore, combineReducers } from 'redux'
import profileReducer from '../reducers/profileReducer'
import subjectReducer from '../reducers/subjectReducer'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducers = {
    profile: profileReducer,
    subjects: subjectReducer
};

const persistConfig ={
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );