import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {logout} from '../features/loginUser/loginUserSlice'
import {profileDetailsReset} from '../features/profileDetails/profileDetailsSlice'

function Header() {
    const userLogin = useSelector((state) => state.loginUser);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(profileDetailsReset())
};

return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>Cart
                            </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.username} id="username">

                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                            <Nav.Link>
                                <i className="fas fa-user"></i>Login
                            </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
);
}

export default Header;
