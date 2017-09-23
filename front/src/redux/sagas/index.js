import auth from './auth'
import user from './user'
import meal from './meal'

export default function* mainSaga () {
  yield [
    auth(),
    meal(),
    user()
  ]
}
