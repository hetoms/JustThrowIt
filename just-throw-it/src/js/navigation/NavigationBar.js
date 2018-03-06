import React from 'react';
import "../../style/NavBar.css";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from "react-router-dom";

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
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2 navigation-toggler" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="ml-auto navigation-box" navbar>
                            <NavItem>
                                <Link to='/about' className="navigation-bar-link nav-link">About the team</Link>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navigation-bar-link" target="_blank" href="https://github.com/hetoms/JustThrowIt">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;