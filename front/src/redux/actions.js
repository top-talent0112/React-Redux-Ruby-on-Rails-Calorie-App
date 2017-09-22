import * as cs from './constants'

export const signin = (payload) => ({
  type: SIGNIN,
  payload
})

export const signout = (payload) => {
  localStorage.removeItem('calories_auth')
  return {
    type: SIGNOUT,
    payload
  }
}

export const signup = (payload) => ({
  type: SIGNUP,
  payload
})
