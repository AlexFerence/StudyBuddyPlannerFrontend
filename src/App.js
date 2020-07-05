import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Calendar from './components/Calendar'
import Tasks from './components/Tasks'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import './styles/styles.scss'

const store = configureStore()

// TESTING REDUX
// console.log(store.getState())
// store.dispatch(setProfile({ email: 'Alex', password: '123456' }))
// console.log(store.getState())

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Switch>
        <Route path='/signup' component={FormPage} exact />
        <Route path='/' exact component={LoginPage} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/settings' component={Settings} />
      </Switch>
    </Provider>
  )
}
  
export default App