import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './redux/store'
import Signin from './containers/signin'
import Signup from './containers/signup'
import Dashboard from './containers/dashboard'
import Profile from './containers/profile'
import Header from './containers/header'
import Meals from './containers/meals'
import MealEdit from './containers/meal_edit'
import Users from './containers/users'
import UserEdit from './containers/user_edit'
import UserNew from './containers/user_new'
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
          <Route path='/profile' component={auth.userIsAuthenticated(Profile)} />
          <Route path='/users' exact component={auth.userIsAuthenticated(auth.userIsAdminOrManager(Users))} />
          <Route path='/users/new' component={auth.userIsAuthenticated(auth.userIsAdminOrManager(UserNew))} />
          <Route path='/user/:id' component={auth.userIsAuthenticated(auth.userIsAdminOrManager(UserEdit))} />
          <Route path='/meals' component={auth.userIsAuthenticated(auth.userIsAdminOrRegular(Meals))} />
          <Route path='/meal/:id' component={auth.userIsAuthenticated(auth.userIsAdminOrRegular(MealEdit))} />
        </div>
      </Router>
    </div>
  </Provider>
)
