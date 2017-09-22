import auth from './auth'
import user from './user'

export default function* mainSaga () {
  yield [
    auth(),
    user()
  ]
}
