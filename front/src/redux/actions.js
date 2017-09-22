import * as cs from './constants'

export const signin = (payload) => ({
  type: cs.SIGNIN,
  payload
})

export const signout = (payload) => {
  localStorage.removeItem('calories_auth')
  return {
    type: cs.SIGNOUT,
    payload
  }
}

export const signup = (payload) => ({
  type: cs.SIGNUP,
  payload
})

export const profile = (payload) => ({
  type: cs.PROFILE,
  payload
})
