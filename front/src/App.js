import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './redux/store'
import Login from './containers/login'
import Signup from './containers/signup'
import Dashboard from './containers/dashboard'

export default () => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router>
        <div>
          <Route path='/' exact component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </div>
      </Router>
    </div>
  </Provider>
)
