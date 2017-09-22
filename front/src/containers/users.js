import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Alert, Table, Row, Col, Button, Pagination } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { users_get, user_delete } from '../redux/actions'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    users_get: PropTypes.func,
    history: PropTypes.object
  };

  componentWillMount() {
    const { users_get } = this.props
    users_get({})
  }

  selectPage = (pagination) => {
    const { users_get, userStore: {page_info} } = this.props
    users_get({
      params: {
        per_page: page_info.per_page,
        page: pagination
      }
    }) 
  }

  deleteUser = (id) => {
    const { user_delete, users_get, userStore: {page_info} } = this.props
    if(window.confirm("Do you really want to delete the user?")) {
      user_delete({
        id: id,
        onSuccess: ({ data }) => {
          users_get({
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

  render() {
    const { userStore: { users, page_info } } = this.props
    const { error } = this.state
    const roleNames = {
      "user_manager" : "Manager",
      "regular" : "Regular"
    }

    return (
      <div>
        <h2 className="text-center">Users</h2>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Table responsive bordered condensed striped>
              <thead>
                <tr>
                  <th className="text-center">Email</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Role</th>
                  <th className="text-center">Expected Calories</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user, index) => (
                  <tr key={index}>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{roleNames[user.role]}</td>
                    <td className="text-center">{user.role === "regular" && user.calories}</td>
                    <td className="text-center">
                      <Button bsStyle="info">Edit</Button>
                      &nbsp;
                      <Button bsStyle="danger" onClick={this.deleteUser.bind(this, user.id)}>Delete</Button>
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
  users_get,
  user_delete
}

const mapStateToProps = (state) => ({
  userStore: state.user
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Users)