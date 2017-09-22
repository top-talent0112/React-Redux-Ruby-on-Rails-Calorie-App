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
          <Route path='/' exact component={Dashboard} />
          <Route path='/signin' component={auth.userIsNotAuthenticated(Signin)} />
          <Route path='/signup' component={auth.userIsNotAuthenticated(Signup)} />
          <Route path='/meals' component={auth.userIsAuthenticated(auth.userIsAdminOrRegular(Meals))} />
          <Route path='/users' component={auth.userIsAuthenticated(auth.userIsAdminOrManager(Users))} />
        </div>
      </Router>
    </div>
  </Provider>
)
