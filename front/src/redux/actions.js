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

export const users_get = (payload) => ({
  type: cs.USERS_GET,
  payload
})

export const user_delete = (payload) => ({
  type: cs.USER_DELETE,
  payload
})

export const user_get = (payload) => ({
  type: cs.USER_GET,
  payload
})

export const user_update = (payload) => ({
  type: cs.USER_UPDATE,
  payload
})

export const user_create = (payload) => ({
  type: cs.USER_CREATE,
  payload
})

export const meals_get = (payload) => ({
  type: cs.MEALS_GET,
  payload
})

export const meal_delete = (payload) => ({
  type: cs.MEAL_DELETE,
  payload
})

export const meal_get = (payload) => ({
  type: cs.MEAL_GET,
  payload
})

export const meal_update = (payload) => ({
  type: cs.MEAL_UPDATE,
  payload
})

export const meal_create = (payload) => ({
  type: cs.MEAL_CREATE,
  payload
})