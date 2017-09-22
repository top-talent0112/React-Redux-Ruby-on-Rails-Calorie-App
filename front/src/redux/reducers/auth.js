import * as cs from '../constants'
import { success, failure } from '../request'


const storageAuth = JSON.parse(localStorage.getItem('calories_auth') || null)
const initialState = storageAuth ? {
  token: storageAuth.token,
  profile: storageAuth.profile,
  status: 'INIT',
  error: null
} : {
  token: null,
  profile: null,
  status: 'INIT',
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cs.SIGNIN):
      return {
        ...state,
        token: action.payload.token,
        status: success(cs.SIGNIN),
        profile: action.payload.profile
      };

    case failure(cs.SIGNIN):
      return {
        ...state,
        token: null,
        status: failure(cs.SIGNIN),
        profile: null,
        error: action.payload
      };

    case cs.SIGNOUT:
      return {
        ...state,
        token: null,
        status: cs.SIGNOUT,
        profile: null,
        error: null
      };

    case success(cs.SIGNUP):
      return {
        ...state,
        token: action.payload.token,
        status: success(cs.SIGNUP),
        profile: action.payload.profile,
        error: null
      };

    case failure(cs.SIGNUP):
      return {
        ...state,
        token: null,
        status: failure(cs.SIGNUP),
        profile: null,
        error: action.payload
      };

    case success(cs.PROFILE):
      return {
        ...state,
        status: success(cs.PROFILE),
        profile: action.payload,
        error: null
      }

    case failure(cs.PROFILE):
      return {
        ...state,
        status: failure(cs.PROFILE),
        error: action.payload
      }

    default:
      return state
  }
}
