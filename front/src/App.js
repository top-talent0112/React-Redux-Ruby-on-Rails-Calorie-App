import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './redux/store'
import Signin from './containers/signin'
import Signup from './containers/signup'
import Dashboard from './containers/dashboard'
import Header from './containers/header'
import Meals from './containers/meals'
import Users from './containers/users'
import * as auth from './helpers/auth'

export default () => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router>
        <div>
          <Header />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/signin' component={auth.isNotAuthenticated(Signin)} />
          <Route path='/signup' component={auth.isNotAuthenticated(Signup)} />
          <Route path='/meals' component={auth.isAuthenticated(Meals)} />
          <Route path='/users' component={auth.isAuthenticated(auth.isNotRegular(Users))} />
        </div>
      </Router>
    </div>
  </Provider>
)
