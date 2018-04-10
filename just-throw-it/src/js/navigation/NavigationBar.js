import React from 'react';
import "../../style/NavBar.css";
import {Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../app/Actions";

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navigation-bar" light>
          <Link to='/' className="mr-auto brand-name navbar-brand">JustThrowIt</Link>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2 navigation-toggler"/>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto navigation-box" navbar>
              <NavItem>
                <Link to='/about' className="navigation-bar-link nav-link">About the team</Link>
              </NavItem>

              {this.props.userLoggedIn ? (
                <NavItem>
                  <Link to='/user' className="navigation-bar-link nav-link">Profile</Link>
                </NavItem>
              ) : null}

              <NavItem>
                <NavLink className="navigation-bar-link" target="_blank"
                         href="https://github.com/hetoms/JustThrowIt">Github</NavLink>
              </NavItem>
              {this.props.userLoggedIn ? (
                <NavItem>
                  <Link onClick={this.props.actions.logout} to='/' className="navigation-bar-link nav-link">
                    Log out
                  </Link>
                </NavItem>
              ) : null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
