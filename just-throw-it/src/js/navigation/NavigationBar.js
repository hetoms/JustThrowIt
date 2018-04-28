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

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar className="navigation-bar" expand="md" light>
                    <Link to='/' className="mr-auto brand-name navbar-brand">JustThrowIt</Link>
                    <NavbarToggler onClick={this.toggle} className='navigation-toggler'/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto navigation-box" navbar>
                            {this.props.userLoggedIn ? (
                                <NavItem onClick={this.toggle}>
                                    <Link to='/user' className="navigation-bar-link nav-link">Profile</Link>
                                </NavItem>
                            ) : null}

                            <NavItem onClick={this.toggle}>
                                <NavLink className="navigation-bar-link" target="_blank"
                                         href="https://github.com/hetoms/JustThrowIt">Github</NavLink>
                            </NavItem>
                            <NavItem onClick={this.toggle}>
                                <Link to='/about' className="navigation-bar-link nav-link">About the team</Link>
                            </NavItem>
                            {this.props.userLoggedIn ? (
                                <NavItem onClick={this.toggle}>
                                    <Link onClick={this.props.actions.logout} to='/'
                                          className="navigation-bar-link nav-link">
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
