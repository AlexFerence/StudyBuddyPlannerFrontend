import { createStore, combineReducers, applyMiddleware } from 'redux'
import profileReducer from '../reducers/profileReducer'
import subjectReducer from '../reducers/subjectReducer'
import taskReducer from '../reducers/taskReducer'
import isRunningReducer from '../reducers/isRunningReducer'
import semesterReducer from '../reducers/semesterReducer'
import schoolsReducer from '../reducers/schoolsReducer'
import facultiesReducer from '../reducers/facultyReducer'

import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducers = {
    profile: profileReducer,
    subjects: subjectReducer,
    tasks: taskReducer,
    running: isRunningReducer,
    semester: semesterReducer,
    schools: schoolsReducer,
    faculties: facultiesReducer
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
    composeWithDevTools(
        applyMiddleware(thunk)
));