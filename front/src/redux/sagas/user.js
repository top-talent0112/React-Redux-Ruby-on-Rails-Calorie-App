import { takeLatest } from 'redux-saga/effects'
import * as cs from '../constants'
import request from '../request'

const users_get = request({
  type: cs.USERS_GET,
  method: 'get',
  path: () => '/users',
  onSuccess: (res, action) => {
  }
})

const regulars_get = request({
  type: cs.REGULARS_GET,
  method: 'get',
  path: () => '/users/regulars',
  onSuccess: (res, action) => {
  }
})

const user_delete = request({
  type: cs.USER_DELETE,
  method: 'delete',
  path: ({payload}) => `/users/${payload.id}`,
  onSuccess: (res, action) => {
  }
})

const user_get = request({
  type: cs.USER_GET,
  method: 'get',
  path: ({payload}) => `/users/${payload.id}`,
  onSuccess: (res, action) => {
  }
})

const user_update = request({
  type: cs.USER_UPDATE,
  method: 'patch',
  path: ({payload}) => `/users/${payload.id}`,
  onSuccess: (res, action) => {
  }
})

const user_create = request({
  type: cs.USER_CREATE,
  method: 'post',
  path: () => `/users/`,
  onSuccess: (res, action) => {
  }
})

export default function* authSaga () {
  yield takeLatest(cs.USERS_GET, users_get)
  yield takeLatest(cs.REGULARS_GET, regulars_get)
  yield takeLatest(cs.USER_DELETE, user_delete)
  yield takeLatest(cs.USER_GET, user_get)
  yield takeLatest(cs.USER_UPDATE, user_update)
  yield takeLatest(cs.USER_CREATE, user_create)
}
