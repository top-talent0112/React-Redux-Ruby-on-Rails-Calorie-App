import * as cs from '../constants'
import { success, failure } from '../request'

const initialState = {
  status: 'INIT',
  users: [],
  page_info: {
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    count: 0,
    total_count: 0
  },
  user: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cs.USERS_GET):
      return {
        ...state,
        status: success(cs.USERS_GET),
        users: action.payload.users,
        page_info: action.payload.paginate_info,
        user: null,
        error: null
      };

    case failure(cs.USERS_GET):
      return {
        ...state,
        status: failure(cs.USERS_GET),
        users: [],
        page_info: initialState.page_info,
        user: null,
        error: action.payload
      };

    case success(cs.USER_GET):
      return {
        ...state,
        status: success(cs.USER_GET),
        user: action.payload,
        error: null
      };

    case failure(cs.USER_GET):
      return {
        ...state,
        status: failure(cs.USER_GET),
        user: null,
        error: action.payload
      };

    case success(cs.USER_CREATE):
      return {
        ...state,
        status: success(cs.USER_CREATE),
        user: action.payload,
        error: null
      };

    case failure(cs.USER_CREATE):
      return {
        ...state,
        status: failure(cs.USER_CREATE),
        user: null,
        error: action.payload
      };

    case success(cs.USER_UPDATE):
      return {
        ...state,
        status: success(cs.USER_UPDATE),
        user: action.payload,
        error: null
      };

    case failure(cs.USER_UPDATE):
      return {
        ...state,
        status: failure(cs.USER_UPDATE),
        user: null,
        error: action.payload
      };

    case success(cs.USER_DELETE):
      return {
        ...state,
        status: success(cs.USER_DELETE),
        user: action.payload,
        error: null
      };

    case failure(cs.USER_DELETE):
      return {
        ...state,
        status: failure(cs.USER_DELETE),
        user: null,
        error: action.payload
      };

    default:
      return state
  }
}
