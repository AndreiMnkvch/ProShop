import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/registerUser/registerUserSlice";
import FormContainer from "../components/FormContainer";
import { useSearchParams } from "react-router-dom";


function RegisterPage() {
    console.log("Register Page start")
    const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "", email: ""});
    console.log("default REGISTER formData is", formData)
    const [searchParams] = useSearchParams();
    const registerUser = useSelector((state) => state.registerUser);
    const { userInfo, error, isLoading } = registerUser;
    console.log("register user, ", registerUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'
    console.log("register page redirect is ", redirect)
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("register page useEffect")
        if (userInfo) {
            console.log("register page useEffect userInfo is true so navigaring to ", redirect)
        navigate(redirect);
        }
    }, [userInfo, isLoading, navigate, redirect]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword){
            setMessage('Passwords do not match')
        }else {
            console.log("register submit")
            dispatch(register(formData));
        }
    };

    const onChangeHandler = (event) => {
        const { value, name } = event.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    return (
        <div>
            <FormContainer>
                <h1>Register</h1>
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {isLoading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>

                    <FormGroup controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            placeholder="Enter username"
                            value={formData.username}
                            name="username"
                            onChange={onChangeHandler}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            name="email"
                            onChange={onChangeHandler}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            name="password"
                            onChange={onChangeHandler}
                        ></Form.Control>
                    </FormGroup>
                    
                    <FormGroup controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"  
                            value={formData.confirmPassword}
                            name="confirmPassword"
                            onChange={onChangeHandler}
                        ></Form.Control>
                    </FormGroup>

                    <Button type="submit" variant="primary">
                        Register
                    </Button>

                </Form>

                <Row className="py-3">
                    <Col>
                        Have an account? 
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Log In</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
}

export default RegisterPage;
