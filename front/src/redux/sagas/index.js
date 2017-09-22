import auth from './auth'

export default function* mainSaga () {
  yield [
    auth()
  ]
}
