import axios from 'axios'
import { put } from 'redux-saga/effects'
import { get } from 'lodash'

export const pending = type => `${type}_PENDING`
export const success = type => `${type}_SUCCESS`
export const failure = type => `${type}_FAILURE`

const defaultHeaders = () => {
  const auth = localStorage.getItem('calories_auth')
  axios.defaults.baseURL = 'http://localhost:9000/v1/'
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = token
  }

  return headers
}

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  headers,
  onSuccess,
  onFailure,
  payloadOnSuccess,
  payloadOnFailure
}) => function* (action) {
  const {
    body,
    params,
    onSuccess: successCallback,
    onFailure: failureCallback
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
    onSuccess && onSuccess(res, action)

    yield put({
      type: success(type),
      payload: payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data
    })
  } catch (err) {
    const errRes = get(err, 'response', err)

    failureCallback && failureCallback(errRes)
    onFailure && onFailure(errRes)

    yield put({
      type: failure(type),
      payload: payloadOnFailure ? payloadOnFailure(errRes, action) : errRes
    })
  }
}
