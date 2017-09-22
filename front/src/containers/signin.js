import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Alert, Row, Col, Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { validateEmail } from '../helpers'
import InputField from '../components/input-field'
import { signin } from '../redux/actions'

const isRequired = (value) => value === undefined && `Required`
const isValidEmail = (value) => !validateEmail(value) && 'Not Email Format'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    signin: PropTypes.func,
    history: PropTypes.object
  };

  submit = (values) => {
    const { history, signin } = this.props
    signin({
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
              <div className="text-center">
                <Button type="submit">Sign In</Button>
              </div>
            </Form>
            <br />
            {error && <Alert bsStyle="danger">
              {error.error_content}
            </Alert>}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signin
}

export default compose(
  reduxForm({
    form: 'signinForm'
  }),
  withRouter,
  connect(null, mapDispatchToProps)
)(Signin)
