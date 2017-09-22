import axios from 'axios'
import { put } from 'redux-saga/effects'
import { get } from 'lodash'
import { failure, pending, success } from '../helpers'

const defaultHeaders = () => {
  const auth = localStorage.getItem('calories_auth')
  axios.defaults.baseURL = process.env.API_ROOT + '/'
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'JWT ' + token
  }

  return headers
}

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  headers,
  success,
  fail,
  payloadOnSuccess,
  payloadOnFail
}) => function* (action) {
  const {
    body,
    params,
    success: successCallback,
    fail: failCallback
  } = (action.payload || {})

  try {
    yield put({
      type: pending(type)
    })

    const res = yield axios.request({
      url: typeof path === 'function' ? path(action) : path,
      method: method.toLowerCase(),
      headers: Object.assign({}, defaultHeaders(), headers),
      data: body,
      params
    })

    successCallback && successCallback(res)
    success && success(res, action)

    yield put({
      type: success(type),
      payload: payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data
    })
  } catch (err) {
    const errRes = get(err, 'response', err)

    failCallback && failCallback(errRes)
    fail && fail(errRes)

    yield put({
      type: failure(type),
      payload: payloadOnFail ? payloadOnFail(errRes, action) : errRes
    })
  }
}
