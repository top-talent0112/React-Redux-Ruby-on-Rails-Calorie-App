import React from 'react'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { SIGNIN } from '../redux/constants'
import { pending } from '../redux/request'

export const isAdmin = (profile) => profile.role === 'admin'
export const isManager = (profile) => profile.role === 'user_manager'
export const isRegular = (profile) => profile.role === 'regular'

const locationHelper = locationHelperBuilder({})

export const isSigningIn = state => pending(SIGNIN) === state.auth.status

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.profile !== null,
  authenticatingSelector: state => isSigningIn(state),
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: (<div>Siging you in ...</div>),
  redirectPath: '/signin'
})

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.profile === null && !isSigningIn(state),
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false
})

export const userIsAdminOrRegular = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.profile !== null &&
    (isAdmin(state.auth.profile) || isRegular(state.auth.profile)),
  predicate: user => isAdmin(user) || isRegular(user),
  wrapperDisplayName: 'UserIsAdminOrRegular'
})

export const userIsAdminOrManager = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.profile !== null &&
    (isAdmin(state.auth.profile) || isManager(state.auth.profile)),
  predicate: user => isAdmin(user) || isManager(user),
  wrapperDisplayName: 'UserIsAdminOrManager'
})