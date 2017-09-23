import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Alert, Table, Row, Col, Button, Pagination } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { meals_get, meal_delete } from '../redux/actions'

class Meals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    meals_get: PropTypes.func,
    history: PropTypes.object
  };

  componentWillMount() {
    const { meals_get } = this.props
    meals_get({})
  }

  selectPage = (pagination) => {
    const { meals_get, mealStore: {page_info} } = this.props
    meals_get({
      params: {
        per_page: page_info.per_page,
        page: pagination
      }
    }) 
  }

  deleteMeal = (id) => {
    const { meal_delete, meals_get, mealStore: {page_info} } = this.props
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

  render() {
    const { mealStore: { meals, page_info }, authStore } = this.props
    const { error } = this.state

    return (
      <div>
        <h2 className="text-center">Meals</h2>
        <Row>
          <Col xs={10} xsOffset={1}>
            <div className="text-right">
              <Button bsStyle="primary" onClick={this.newMeal.bind(this)}>Create New Meal</Button>
            </div>
            <br/>
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
                    <td className="text-center">{meal.date}</td>
                    <td className="text-center">{meal.time}</td>
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
  meal_delete
}

const mapStateToProps = (state) => ({
  mealStore: state.meal,
  authStore: state.auth,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Meals)