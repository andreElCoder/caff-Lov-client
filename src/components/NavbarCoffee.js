import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from './auth/auth-service';
import Navbar from 'react-bootstrap/Navbar'
import SearchCoffee from './coffee/SearchCoffee';

class NavbarCoffee extends Component {
    service = new AuthService();

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.setCurrentUser(null);
            })
    }

    render() { 
        
        if (this.props.loggedInUser) {
            return (<div className="nav-2">
                    <Navbar className="nav-bar-color" >
                        <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/coffee.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        CaffeLov
                        </Navbar.Brand>
                        <div id="search">
                            <div className="navbar-links">
                                <NavLink className="nav-bar-link" activeClassName="selected" to='/profile'>Profile</NavLink>
                                <NavLink onClick={this.logoutUser} className="nav-bar-link" to='/'>
                                    Logout
                                </NavLink>    
                            </div>
                            <SearchCoffee/>
                        </div>
                    </Navbar>
            </div>)
        } else {
            return (<div>
                <Navbar className="nav-bar-color ">
                        <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/coffee.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        CaffeLov
                        </Navbar.Brand>
                        <div className="navbar-links">
                            <NavLink className="nav-bar-link" activeClassName="selected" to='/login'>Login</NavLink>
                            <NavLink className="nav-bar-link" activeClassName="selected" to='/signup'>Signup</NavLink>
                        </div>
                    </Navbar>
                </div>
            )
        }

    }
}

export default NavbarCoffee;