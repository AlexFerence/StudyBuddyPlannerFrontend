import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'


import './styles/styles.scss'

const store = configureStore()

// TESTING REDUX
// console.log(store.getState())
// store.dispatch(setProfile({ email: 'Alex', password: '123456' }))
// console.log(store.getState())

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path='/signup' component={FormPage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/home' component={HomePage} />
      </Switch>
    </Provider>
  )
}
  
export default App