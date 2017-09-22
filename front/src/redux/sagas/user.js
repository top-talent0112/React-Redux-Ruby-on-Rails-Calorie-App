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

export default function* authSaga () {
  yield takeLatest(cs.USERS_GET, users_get)
}
