import { takeLatest } from 'redux-saga/effects'
import * as cs from '../constants'
import request from '../request'

const signin = request({
  type: cs.SIGNIN,
  method: 'post',
  path: () => '/auths/sign_in/',
  success: (res, action) => {
    localStorage.setItem('calories_auth', JSON.stringify(res.data))
  }
})

const signup = request({
  type: cs.SIGNUP,
  method: 'post',
  path: () => '/auths/sign_up/',
  success: () => {
    localStorage.removeItem('calories_auth')
  },
  fail: () => {
    localStorage.removeItem('calories_auth')
  }
})

export default function* authSaga () {
  yield takeLatest(cs.SIGNIN, signin)
  yield takeLatest(cs.SIGNUP, signup)
}
