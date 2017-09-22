import React from 'react'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { SIGNIN } from '../redux/constants'
import { pending } from '../redux/request'

export const isAdmin = (profile) => profile.role === 'admin'
export const isManager = (profile) => profile.role === 'user_manager'
export const isUser = (profile) => profile.role === 'regular'
export const canManageUsers = (profile) => isAdmin(profile) || isManager(profile)

const locationHelper = locationHelperBuilder({})

export const isSigningIn = state => pending(SIGNIN) === state.auth.status

const isAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.profile !== null,
  authenticatingSelector: state => isSigningIn(state),
  wrapperDisplayName: 'isAuthenticated'
}

export const isAuthenticated = connectedRouterRedirect({
  ...isAuthenticatedDefaults,
  AuthenticatingComponent: (<div>Siging you in ...</div>),
  redirectPath: '/signin'
})

export const isNotRegular = connectedRouterRedirect({
  redirectPath: '/dashboard',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.profile !== null &&
    (isAdmin(state.auth.profile) || isManager(state.auth.profile)),
  predicate: user => isAdmin(user) || isManager(user),
  wrapperDisplayName: 'isNotRegular'
})

const isNotAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.profile === null && !isSigningIn(state),
  wrapperDisplayName: 'isNotAuthenticated'
}

export const isNotAuthenticated = connectedRouterRedirect({
  ...isNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
  allowRedirectBack: false
})
