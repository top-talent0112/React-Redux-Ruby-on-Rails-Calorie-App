import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm, getFormValues } from "redux-form"
import { Alert, Row, Col, Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { validateEmail } from "../helpers"
import InputField from "../components/input-field"
import { user_create } from "../redux/actions"

const isRequired = (value) => (value === undefined || value === "") && "Required"
const isValidEmail = (value) => !validateEmail(value) && "Not Email Format"
const isPositiveInteger = (value) => value <= 0 && "Not Positive Number"

const roleOptions = [
  { value: "regular", label: "Regular" },
  { value: "user_manager", label: "Manager" }
]

class UserNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    user_create: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
  }

  submit = (values) => {
    const { history, user_create } = this.props
    user_create({
      body: values,
      onSuccess: () => history.push("/users"),
      onFailure: ({ data }) => this.setState({ error: data })
    })
  }

  render() {
    const { handleSubmit, userStore, formValues } = this.props
    const { error } = this.state

    return (
      <div>
        <h2 className="text-center">Create New User</h2>
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
              <Field
                name="role"
                label="Role"
                componentClass="select"
                placeholder="Role"
                validate={isRequired}
                component={InputField}
                options={roleOptions}
              />
              {formValues && formValues.role === "regular" && <Field
                name="calories"
                label="Expected Calories"
                type="number"
                placeholder="Expected Calories"
                validate={isPositiveInteger}
                component={InputField}
              />}
              <div className="text-center">
                <Button type="submit">Create</Button>
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
  user_create
}

const mapStateToProps = (state) => ({
  userStore: state.user,
  initialValues: {role: "regular"},
  formValues: getFormValues("userNewForm")(state),
})

const validate = (values) => {
  const errors = {}
  if (values.password !== values.password_confirm) {
    errors.password_confirm = "Password does not match"
  }
  return errors
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "userNewForm",
    validate
  }),
  withRouter
)(UserNew)
