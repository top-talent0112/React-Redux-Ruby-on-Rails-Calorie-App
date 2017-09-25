import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from "moment"
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Alert, Table, Row, Col, Button, Pagination, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { meals_get, meal_delete, calories_today } from '../redux/actions'
import DateTimeField from "../components/datetime-field"

const isRequired = (value) => (value === undefined || value === "") && "Required"
const isDate = (value) => value !== undefined && value !== "" && !(value instanceof moment) && "Not Date Format"
const isTime = (value) => value !== undefined && value !== "" && !(value instanceof moment) && "Not Time Format"

class Meals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    meals_get: PropTypes.func,
    meal_delete: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object
  };

  componentWillMount() {
    const { meals_get } = this.props
    meals_get({})
  }

  selectPage = (pagination) => {
    const { meals_get, mealStore: {page_info}, filterFormValues } = this.props
    const params = {
      per_page: page_info.per_page,
      page: pagination,
      date_from: filterFormValues && filterFormValues.date_from ? filterFormValues.date_from.format("YYYY-MM-DD") : null,
      date_to: filterFormValues && filterFormValues.date_to ? filterFormValues.date_to.format("YYYY-MM-DD") : null,
      time_from: filterFormValues && filterFormValues.time_from ? filterFormValues.time_from.format("HH:mm:ss") : null,
      time_to: filterFormValues && filterFormValues.time_to ? filterFormValues.time_to.format("HH:mm:ss") : null
    }
    meals_get({
      params: params
    }) 
  }

  deleteMeal = (id) => {
    const { meal_delete, meals_get, calories_today, mealStore: {page_info} } = this.props
    if(window.confirm("Do you really want to delete the meal?")) {
      meal_delete({
        id: id,
        onSuccess: ({ data }) => {
          meals_get({
            params: {
              per_page: page_info.per_page,
              page: page_info.current_page
            }
          })
          calories_today({})
        },
        onFailure: ({ data }) => this.setState({ error: data })
      })
    }
  }

  editMeal = (id) => {
    const { history } = this.props
    history.push('/meal/'+id)
  }

  newMeal = () => {
    const { history } = this.props
    history.push('/meals/new')
  }

  filterMeals = (values) => {
    const { meals_get } = this.props
    const params = {
      date_from: values.date_from ? values.date_from.format("YYYY-MM-DD") : null,
      date_to: values.date_to ? values.date_to.format("YYYY-MM-DD") : null,
      time_from: values.time_from ? values.time_from.format("HH:mm:ss") : null,
      time_to: values.time_to ? values.time_to.format("HH:mm:ss") : null
    }
    meals_get({
      params: params
    })
  }

  render() {
    const { mealStore: { meals, page_info }, authStore, filterFormValues, handleSubmit } = this.props
    const { error } = this.state
    return (
      <div>
        <h2 className="text-center">Meals</h2>
        <Row>
          <Col xs={10} xsOffset={1}>
            <div className="text-right">
              <Button bsStyle="primary" onClick={this.newMeal.bind(this)}>Create New Meal</Button>
            </div>
            <Form inline onSubmit={handleSubmit(this.filterMeals)} style={{height: "85px"}}>
              <Field
                name="date_from"
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                placeholder="Date From"
                component={DateTimeField}
                validate={[isDate]}
                utc={true}
              />
              {' '}
              <Field
                name="date_to"
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                placeholder="Date To"
                component={DateTimeField}
                validate={[isDate]}
                utc={true}
              />
              {' '}
              <Field
                name="time_from"
                dateFormat={false}
                timeFormat="HH:mm:ss"
                placeholder="Time From"
                component={DateTimeField}
                validate={[isTime]}
                utc={true}
              />
              {' '}
              <Field
                name="time_to"
                dateFormat={false}
                timeFormat="HH:mm:ss"
                placeholder="Time To"
                component={DateTimeField}
                validate={[isTime]}
                utc={true}
              />
              <Button type="submit" className="pull-right" style={{marginTop:"20px"}}>Filter</Button>
            </Form>
            <Table responsive bordered condensed striped>
              <thead>
                <tr>
                  { authStore.profile.role==="admin" && <th className="text-center">User</th>}
                  <th className="text-center">Date</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Calories</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {meals && meals.map((meal, index) => (
                  <tr key={index}>
                    { authStore.profile.role==="admin" && <td className="text-center">{meal.user.email} ({meal.user.name})</td> }
                    <td className="text-center">{meal.time.split(" ")[0]}</td>
                    <td className="text-center">{meal.time.split(" ")[1]}</td>
                    <td className="text-center">{meal.title}</td>
                    <td className="text-center">{meal.calories}</td>
                    <td className="text-center">
                      <Button bsStyle="info" onClick={this.editMeal.bind(this, meal.id)}>Edit</Button>
                      &nbsp;
                      <Button bsStyle="danger" onClick={this.deleteMeal.bind(this, meal.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center">
              <Pagination prev next first last ellipsis boundaryLinks
                items={page_info.total_pages} maxButtons={5} activePage={page_info.current_page}
                onSelect={this.selectPage} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  meals_get,
  meal_delete,
  calories_today
}

const mapStateToProps = (state) => ({
  mealStore: state.meal,
  authStore: state.auth,
  filterFormValues: getFormValues("mealsFilterForm")(state)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "mealsFilterForm",
    enableReinitialize: true
  }),
  withRouter
)(Meals)