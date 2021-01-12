import { createStore, combineReducers, applyMiddleware } from 'redux'
import profileReducer from '../reducers/profileReducer'
import subjectReducer from '../reducers/subjectReducer'
import taskReducer from '../reducers/taskReducer'
import isRunningReducer from '../reducers/isRunningReducer'
import semesterReducer from '../reducers/semesterReducer'
import schoolsReducer from '../reducers/schoolsReducer'
import facultiesReducer from '../reducers/facultyReducer'
import currentTaskReducer from '../reducers/currentTaskReducer'
import chartsReducer from '../reducers/chartsReducer'
import subscriptionsReducer from '../reducers/subscriptionReducer'
import friendReducer from '../reducers/friendsReducer'
import widthReducer from '../reducers/widthReducer'
import premiumStatsReducer from '../reducers/premiumStatsReducer'
import currentSubjectReducer from '../reducers/currentSubjectReducer'
import loadingReducer from '../reducers/loadingReducer'
import feedReducer from '../reducers/feedReducer'
import signupThirdReducer from '../reducers/signupThirdReducer'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { DESTROY_SESSION } from '../actions/profileActions'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import settingsReducer from '../reducers/settingsReducer'
import selectedSemesterReducer from '../reducers/selectedSemesterReducer'

const reducers = {
    profile: profileReducer,
    subjects: subjectReducer,
    tasks: taskReducer,
    running: isRunningReducer,
    semester: semesterReducer,
    schools: schoolsReducer,
    faculties: facultiesReducer,
    currentTask: currentTaskReducer,
    charts: chartsReducer,
    subscriptions: subscriptionsReducer,
    friends: friendReducer,
    width: widthReducer,
    premiumStats: premiumStatsReducer,
    currentSubject: currentSubjectReducer,
    loading: loadingReducer,
    feed: feedReducer,
    signupThird: signupThirdReducer,
    settings: settingsReducer,
    selectedSemester: selectedSemesterReducer
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === DESTROY_SESSION)
        state = undefined;

    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);