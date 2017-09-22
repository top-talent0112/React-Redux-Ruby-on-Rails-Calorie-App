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
  onSuccess: () => {
    localStorage.removeItem('calories_auth')
  },
  onFailure: () => {
    localStorage.removeItem('calories_auth')
  }
})

export default function* authSaga () {
  yield takeLatest(cs.SIGNIN, signin)
  yield takeLatest(cs.SIGNUP, signup)
}
