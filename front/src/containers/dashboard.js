import React, { Component } from 'react'
import { Collapse, Grid, Navbar, Nav, NavItem, Row, Col, Label } from "react-bootstrap"

class Dashboard extends Component {
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

export default Dashboard
