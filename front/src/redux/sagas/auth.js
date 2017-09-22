import { takeLatest } from 'redux-saga/effects'
import * as cs from '../constants'
import request from '../request'

const signin = request({
  type: cs.SIGNIN,
  method: 'post',
  path: () => '/auth/sign_in/',
  onSuccess: (res, action) => {
    localStorage.setItem('calories_auth', JSON.stringify(res.data))
  }
})

const signup = request({
  type: cs.SIGNUP,
  method: 'post',
  path: () => '/auth/sign_up/',
  onSuccess: (res, action) => {
    localStorage.setItem('calories_auth', JSON.stringify(res.data))
  }
})

export default function* authSaga () {
  yield takeLatest(cs.SIGNIN, signin)
  yield takeLatest(cs.SIGNUP, signup)
}
