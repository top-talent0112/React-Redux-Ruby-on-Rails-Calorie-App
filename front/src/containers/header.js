import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Collapse, Grid, Navbar, Nav, NavItem } from "react-bootstrap"
import { signout } from "../redux/actions"

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
  }

  signout = (e) => {
    const { signout } = this.props
    signout()
  }

  render() {
    const { auth } = this.props

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
            {auth.profile
            ? <Nav pullRight>
              <NavItem>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link to="/users" className="nav-link">Users</Link>
              </NavItem>
              <NavItem>
                <Link to="/meals" className="nav-link">Meals</Link>
              </NavItem>
              <NavItem>
                <Link to="/profile" className="nav-link">Profile</Link>
              </NavItem>
              <NavItem>
                <Link to="/" onClick={this.signout} className="nav-link">Sign out</Link>
              </NavItem>
            </Nav>
            : <Nav pullRight>
              <NavItem>
                <Link to="/signin" className="nav-link">Sign in</Link>
              </NavItem>
              <NavItem>
                <Link to="/signup" className="nav-link">Sign up</Link>
              </NavItem>
            </Nav>}
          </Navbar.Collapse>
        </Navbar>
        {auth.profile && <Grid fluid className="text-right">
          Welcome <strong>{auth.profile.name}</strong>!
        </Grid>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
