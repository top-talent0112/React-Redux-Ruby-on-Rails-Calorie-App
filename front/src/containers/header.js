import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Collapse, Grid, Navbar, Nav, NavItem, Row, Col, Label } from "react-bootstrap"
import { signout, calories_today } from "../redux/actions"

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
  }

  componentWillMount() {
    const { authStore: { profile }, calories_today } = this.props
    
    if(profile && profile.role==="regular") {
      calories_today({})
    }
  }

  signout = (e) => {
    const { signout } = this.props
    signout()
  }

  render() {
    const { authStore: { profile }, mealStore: { calories_today } } = this.props

    return (
      <div>
        <Navbar inverse collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Calories Management System</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { profile && (profile.role==="admin" || profile.role==="user_manager") && <NavItem><Link to="/users" className="nav-link">Users</Link></NavItem> }
              { profile && (profile.role==="admin" || profile.role==="regular") && <NavItem><Link to="/meals" className="nav-link">Meals</Link></NavItem> }
              { profile && <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem> }
              { profile && <NavItem><Link to="/signin" onClick={this.signout} className="nav-link">Sign out</Link></NavItem> }
              { !profile && <NavItem><Link to="/signin" className="nav-link">Sign in</Link></NavItem> }
              { !profile && <NavItem><Link to="/signup" className="nav-link">Sign up</Link></NavItem> }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        { profile && <Grid fluid className="text-right">
          Welcome <strong>{profile.name}</strong>!
        </Grid> }
        { profile && profile.role === "regular" && 
        <div>
          <Row>
            <Col xs={3} xsOffset={1}>
              Expected Calories Per Day:
            </Col>
            <Col xs={7} xsOffset={0}>
              {profile.calories || "Not Set"}
            </Col>
          </Row>
          <Row>
            <Col xs={3} xsOffset={1}>
              Consumed Calores Today:
            </Col>
            <Col xs={7} xsOffset={0}>
              <span>{calories_today}{'  '}</span>
              {profile.calories && profile.calories >= calories_today && <Label bsStyle="success">SAFE!!!</Label>}
              {profile.calories && profile.calories < calories_today && <Label bsStyle="danger">NOT SAFE!!!</Label>}
            </Col>
          </Row>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authStore: state.auth,
  mealStore: state.meal
})

const mapDispatchToProps = {
  signout,
  calories_today
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
