import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/loginUser/loginUserSlice";
import FormContainer from "../components/FormContainer";
import { useSearchParams } from "react-router-dom";

function LoginPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [searchParams] = useSearchParams();
    const loginUser = useSelector((state) => state.loginUser);
    const { userInfo, error, isLoading } = loginUser;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'

    useEffect(() => {
        if (userInfo) {
        navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(formData));
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
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {isLoading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter username"
                        value={formData.username}
                        name="username"
                        onChange={onChangeHandler}
                    ></Form.Control>
                </FormGroup>

                <FormGroup controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        name="password"
                        onChange={onChangeHandler}
                    ></Form.Control>
                </FormGroup>

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?
                    <Link
                        to={redirect ? `/register?redirect=${redirect}` : "/register"}
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
        </div>
    );
}

export default LoginPage;
