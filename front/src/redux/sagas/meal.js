import { takeLatest } from 'redux-saga/effects'
import * as cs from '../constants'
import request from '../request'

const meals_get = request({
  type: cs.MEALS_GET,
  method: 'get',
  path: () => '/meals',
  onSuccess: (res, action) => {
  }
})

const meal_delete = request({
  type: cs.MEAL_DELETE,
  method: 'delete',
  path: ({payload}) => `/meals/${payload.id}`,
  onSuccess: (res, action) => {
  }
})

const meal_get = request({
  type: cs.MEAL_GET,
  method: 'get',
  path: ({payload}) => `/meals/${payload.id}`,
  onSuccess: (res, action) => {
  }
})

const meal_update = request({
  type: cs.MEAL_UPDATE,
  method: 'patch',
  path: ({payload}) => `/meals/${payload.id}`,
  onSuccess: (res, action) => {
  }
})

const meal_create = request({
  type: cs.MEAL_CREATE,
  method: 'post',
  path: () => `/meals/`,
  onSuccess: (res, action) => {
  }
})

const calories_today = request({
  type: cs.CALORIES_TODAY,
  method: 'get',
  path: () => `/meals/calories_today/`,
  onSuccess: (res, action) => {
  }
})

export default function* authSaga () {
  yield takeLatest(cs.MEALS_GET, meals_get)
  yield takeLatest(cs.MEAL_DELETE, meal_delete)
  yield takeLatest(cs.MEAL_GET, meal_get)
  yield takeLatest(cs.MEAL_UPDATE, meal_update)
  yield takeLatest(cs.MEAL_CREATE, meal_create)
  yield takeLatest(cs.CALORIES_TODAY, calories_today)
}
