import * as cs from '../constants'
import { success, failure } from '../../helpers'

const initialState = {
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
        status: success(cs.SIGNUP),
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
    default:
      return state;
  }
}
