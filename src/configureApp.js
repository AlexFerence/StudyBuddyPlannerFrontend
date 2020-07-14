import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import SubjectsPage from './components/Subjects'
import './styles.css'
import './styles/styles.scss'

const ConfigureApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/signup' component={FormPage} exact />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/settings' component={Settings} />
        <Route path='/subjects' component={SubjectsPage} />
      </Switch>
    </BrowserRouter>
  )
}
  
export default ConfigureApp