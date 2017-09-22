import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Alert, Row, Col, Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { validateEmail } from '../helpers'
import InputField from '../components/input-field'
import { profile } from '../redux/actions'

const isRequired = (value) => value === undefined && `Required`
const isValidEmail = (value) => !validateEmail(value) && 'Not Email Format'
const isPositiveInteger = (value) => value <= 0 && 'Not Positive Number'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    profile: PropTypes.func,
    history: PropTypes.object
  };

  submit = (values) => {
    const { history, profile } = this.props
    profile({
      body: values,
      onSuccess: () => history.push('/'),
      onFailure: ({ data }) => this.setState({ error: data })
    })
  }

  render() {
    const { handleSubmit, auth } = this.props
    const { error } = this.state

    return (
      <div>
        <h2 className="text-center">Update your profile</h2>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Form onSubmit={handleSubmit(this.submit)}>
              <Field
                name="email"
                label="Email"
                type="text"
                placeholder="Email"
                validate={[isRequired, isValidEmail]}
                component={InputField}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                component={InputField}
              />
              <Field
                name="password_confirm"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                component={InputField}
              />
              <Field
                name="name"
                label="Name"
                type="text"
                placeholder="Name"
                validate={isRequired}
                component={InputField}
              />
              { auth.profile.role === "regular" &&
              <Field
                name="calories"
                label="Expected Calories"
                type="number"
                placeholder="Expected Calories"
                validate={isPositiveInteger}
                component={InputField}
              /> }
              <div className="text-center">
                <Button type="submit">Update</Button>
              </div>
            </Form>
            <br />
            {error && <Alert bsStyle="danger">
              { Object.entries(error.error_content).map((e) => (
                <li>{e[0].charAt(0).toUpperCase() + e[0].slice(1)} {e[1][0]}</li>
              ))}
            </Alert>}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  profile
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  initialValues: state.auth.profile
})

const validate = (values) => {
  const errors = {}
  if (values.password !== values.password_confirm) {
    errors.password_confirm = 'Password does not match'
  }
  return errors
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'profileForm',
    validate
  }),
  withRouter
)(Profile)
