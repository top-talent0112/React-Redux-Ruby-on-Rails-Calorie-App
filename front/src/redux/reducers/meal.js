import * as cs from '../constants'
import { success, failure } from '../request'

const initialState = {
  status: 'INIT',
  meals: [],
  page_info: {
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    count: 0,
    total_count: 0
  },
  meal: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cs.MEALS_GET):
      return {
        ...state,
        status: success(cs.MEALS_GET),
        meals: action.payload.meals,
        page_info: action.payload.paginate_info,
        meal: null,
        error: null
      };

    case failure(cs.MEALS_GET):
      return {
        ...state,
        status: failure(cs.MEALS_GET),
        meals: [],
        page_info: initialState.page_info,
        meal: null,
        error: action.payload
      };

    case success(cs.MEAL_GET):
      return {
        ...state,
        status: success(cs.MEAL_GET),
        meal: action.payload,
        error: null
      };

    case failure(cs.MEAL_GET):
      return {
        ...state,
        status: failure(cs.MEAL_GET),
        meal: null,
        error: action.payload
      };

    case success(cs.MEAL_CREATE):
      return {
        ...state,
        status: success(cs.MEAL_CREATE),
        meal: action.payload,
        error: null
      };

    case failure(cs.MEAL_CREATE):
      return {
        ...state,
        status: failure(cs.MEAL_CREATE),
        meal: null,
        error: action.payload
      };

    case success(cs.MEAL_UPDATE):
      return {
        ...state,
        status: success(cs.MEAL_UPDATE),
        meal: action.payload,
        error: null
      };

    case failure(cs.MEAL_UPDATE):
      return {
        ...state,
        status: failure(cs.MEAL_UPDATE),
        meal: null,
        error: action.payload
      };

    case success(cs.MEAL_DELETE):
      return {
        ...state,
        status: success(cs.MEAL_DELETE),
        meal: action.payload,
        error: null
      };

    case failure(cs.MEAL_DELETE):
      return {
        ...state,
        status: failure(cs.MEAL_DELETE),
        meal: null,
        error: action.payload
      };

    default:
      return state
  }
}
