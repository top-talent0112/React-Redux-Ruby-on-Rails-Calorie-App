import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import moment from "moment"
import { connect } from "react-redux"
import { Field, reduxForm, getFormValues } from "redux-form"
import { Alert, Row, Col, Button, Form } from "react-bootstrap"
import { withRouter } from "react-router"
import { validateEmail } from "../helpers"
import InputField from "../components/input-field"
import DateTimeField from "../components/datetime-field"
import { meal_create, regulars_get, calories_today } from "../redux/actions"

const isRequired = (value) => (value === undefined || value === "") && "Required"
const isDateTime = (value) => !(moment(value).isValid()) && "Not DateTime Format"
const isPositiveInteger = (value) => value <= 0 && "Not Positive Number"

class MealNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    meal_create: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    const { regulars_get, authStore: { profile } } = this.props
    if(profile.role==="admin") {
      regulars_get({})
    }
  }

  submit = (values) => {
    const { history, meal_create, calories_today } = this.props
    meal_create({
      body: values,
      onSuccess: () => {
        history.push("/meals")
        calories_today({})
      },
      onFailure: ({ data }) => this.setState({ error: data })
    })
  }

  render() {
    const { handleSubmit, mealStore, formValues, userStore: { regulars }, authStore: { profile } } = this.props
    const { error } = this.state

    let regularOptions = regulars.map((r) => ({
      value: r.id,
      label: r.email + " (" + r.name + ")"
    }))
    return (
      <div>
        <h2 className="text-center">Create New Meal</h2>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Form onSubmit={handleSubmit(this.submit)}>
              { profile.role === "admin" && 
              <Field
                name="user"
                label="User"
                componentClass="select"
                placeholder="User"
                validate={isRequired}
                component={InputField}
                options={regularOptions}
              /> }
              <Field
                name="time"
                label="Date Time"
                type="text"
                placeholder="YYYY-MM-DD HH:mm:ss"
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm:ss"
                validate={[isRequired, isDateTime]}
                component={DateTimeField}
                utc={true}
              />
              <Field
                name="title"
                label="Title"
                type="text"
                placeholder="Title"
                validate={[isRequired]}
                component={InputField}
              />
              <Field
                name="calories"
                label="Calories"
                type="number"
                placeholder="Calories"
                validate={[isRequired, isPositiveInteger]}
                component={InputField}
              />
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
  meal_create,
  regulars_get,
  calories_today
}

const mapStateToProps = (state) => ({
  authStore: state.auth,
  mealStore: state.meal,
  userStore: state.user,
  initialValues: state.auth.profile.role==="regular" ? {user:state.auth.profile.id} : {},
  formValues: getFormValues("mealNewForm")(state),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "mealNewForm"
  }),
  withRouter
)(MealNew)
