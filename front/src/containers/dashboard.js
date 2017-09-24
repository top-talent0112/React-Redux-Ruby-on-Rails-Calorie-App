import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Collapse, Grid, Navbar, Nav, NavItem, Row, Col, Label } from "react-bootstrap"
import { calories_today } from "../redux/actions"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static propsTypes = {
    calories_today: PropTypes.func,
    history: PropTypes.object
  };

  componentWillMount() {
    const { calories_today, authStore: { profile } } = this.props
    if(profile && profile.role=="regular") {
      calories_today({})
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={8} xsOffset={2} className="text-center">
            <h1>This is Calories Management Application</h1>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authStore: state.auth
})

const mapDispatchToProps = {
  calories_today
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
