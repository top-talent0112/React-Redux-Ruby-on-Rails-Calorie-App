import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Alert, Row, Col, Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { validateEmail } from '../helpers'
import InputField from '../components/input-field'
import { signup } from '../redux/actions'

const isRequired = (value) => value === undefined && `Required`
const isValidEmail = (value) => !validateEmail(value) && 'Not Email Format'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    signup: PropTypes.func,
    history: PropTypes.object
  };

  submit = (values) => {
    const { history, signup } = this.props
    signup({
      body: values,
      onFailure: ({ data }) => this.setState({ error: data })
    })
  }

  render() {
    const { handleSubmit } = this.props
    const { error } = this.state

    return (
      <div>
        <h2 className="text-center">Welcome!!!</h2>
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
                validate={isRequired}
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
              <div className="text-center">
                <Button type="submit">Sign Up</Button>
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
  signup
}

export default compose(
  reduxForm({
    form: 'signupForm'
  }),
  withRouter,
  connect(null, mapDispatchToProps)
)(Signup)
