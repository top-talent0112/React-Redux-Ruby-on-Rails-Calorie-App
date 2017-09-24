import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import moment from "moment"
import { Field, reduxForm, getFormValues } from "redux-form"
import { Alert, Row, Col, Button, Form, Label } from "react-bootstrap"
import { withRouter } from "react-router"
import { validateEmail } from "../helpers"
import InputField from "../components/input-field"
import DateTimeField from "../components/datetime-field"
import { meal_get, meal_update, calories_today } from "../redux/actions"

const isRequired = (value) => (value === undefined || value === "") && "Required"
const isDateTime = (value) => !(moment(value).isValid()) && "Not DateTime Format"
const isPositiveInteger = (value) => value <= 0 && "Not Positive Number"

class MealEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    handleSubmit: PropTypes.func,
    meal_get: PropTypes.func,
    meal_update: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    const { meal_get, match: { params }} = this.props
    params.id && meal_get({id: params.id})
  }

  submit = (values) => {
    const { history, meal_update, calories_today, match: { params }, authStore: { profile } } = this.props
    meal_update({
      id: params.id,
      body: values,
      onSuccess: () => {
        if(profile.role==="regular") {
          calories_today({})  
        }
        history.push("/meals")
      },
      onFailure: ({ data }) => this.setState({ error: data })
    })
  }

  render() {
    const { handleSubmit, mealStore: {meal}, authStore: {profile}, formValues } = this.props
    const { error } = this.state

    return (
      <div>
        <h2 className="text-center">Update Meal</h2>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Form onSubmit={handleSubmit(this.submit)}>
              { profile.role === "admin" && meal && <h3>{meal.user.email} ({meal.user.name})</h3> }
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
  meal_get,
  meal_update,
  calories_today
}

const mapStateToProps = (state) => ({
  authStore: state.auth,
  mealStore: state.meal,
  initialValues: state.meal.meal,
  formValues: getFormValues("mealEditForm")(state),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "mealEditForm"
  }),
  withRouter
)(MealEdit)
