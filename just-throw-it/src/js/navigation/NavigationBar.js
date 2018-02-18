import React from 'react';
import "../../style/NavBar.css";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
                <Navbar className="navigation-bar" light expand="md">
                    <NavbarBrand href="/" className="mr-auto brand-name">JustThrowIt</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="navigation-bar-link" href="/about">About the team</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navigation-bar-link" href="https://github.com/hetoms/JustThrowIt">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;