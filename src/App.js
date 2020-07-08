import React from 'react';
import ConfigureApp from './configureApp'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConfigureApp />
    </Provider>
  )
}
  
export default App


