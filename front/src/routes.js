import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Login from './containers/login'
import Signup from './containers/signup'
import Dashboard from './containers/dashboard'

const routes = () => (
  <Router>
    <div>
      <Route path='/' component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </div>
  </Router>
)

export default routes
