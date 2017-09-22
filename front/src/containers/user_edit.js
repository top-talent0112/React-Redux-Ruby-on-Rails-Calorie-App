import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm, getFormValues } from "redux-form"
import { Alert, Row, Col, Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { validateEmail } from "../helpers"
import InputField from "../components/input-field"
import { user_get, user_update } from "../redux/actions"

const isRequired = (value) => (value === undefined || value === "") && "Required"
const isValidEmail = (value) => !validateEmail(value) && "Not Email Format"
const isPositiveInteger = (value) => value <= 0 && "Not Positive Number"

const roleOptions = [
  { value: "regular", label: "Regular" },
  { value: "user_manager", label: "Manager" }
]

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    user_get: PropTypes.func,
    user_update: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    const { user_get, match: { params }} = this.props
    params.id && user_get({id: params.id})
  }

  submit = (values) => {
    const { history, user_update, match: { params } } = this.props
    user_update({
      id: params.id,
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
        <h2 className="text-center">Update User</h2>
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
  user_get,
  user_update
}

const mapStateToProps = (state) => ({
  userStore: state.user,
  initialValues: state.user.user,
  formValues: getFormValues("userEditForm")(state),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "userEditForm"
  }),
  withRouter
)(UserEdit)
