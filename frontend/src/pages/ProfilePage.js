import { Form, Button, Row, Col, FormGroup, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/loginUser/loginUserSlice";
import { useSearchParams } from "react-router-dom";
import { getProfileDetails, profileDetailsReset } from "../features/profileDetails/profileDetailsSlice";
import { update, updateProfileReset } from "../features/updateProfileDetails/updateProfileDetailsSlice";
import { getOrdersMy } from "../features/orders/ordersListMySlice";

function ProfilePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "", email: ""});
    const [searchParams] = useSearchParams();
    
    const loginUser = useSelector((state) => state.loginUser);
    const { userInfo, isSigningIn } = loginUser;

    const profileDetails = useSelector((state) => state.profileDetails);
    const { profileInfo, error, isLoading } = profileDetails;
    
    const updatedProfileDetails = useSelector((state) => state.updateProfileDetails);
    const { updatedProfileInfo, isUpdated, isUpdating } = updatedProfileDetails;

    const ordersList = useSelector((state) => state.ordersList);
    const { orders, isLoading:isLoadingOrders , error: errorOrders } = ordersList;


    useEffect(() => {
        if (!userInfo) {
        navigate("/login");
        } else {
            if (isUpdated && !isSigningIn){
                dispatch(profileDetailsReset())
                dispatch(login({"username" : updatedProfileInfo.username, "password": formData.password}))
                dispatch(updateProfileReset())
            }
            
            if (!profileInfo && !isUpdating) {
                dispatch(getProfileDetails())
                dispatch(getOrdersMy())
                }
                setFormData({"username": profileInfo.username, "email": profileInfo.email})
            }
        }
    , [ userInfo,updatedProfileInfo, dispatch, profileInfo, isUpdated, navigate]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword){
            setMessage('Passwords do not match')
        }else {
            dispatch(update(
                {
                    "id": userInfo.id,
                    "username": formData.username,
                    "password": formData.password,
                    "email": formData.email
                }
            ))
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

            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
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
                            Update
                        </Button>

                    </Form>

                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {isLoadingOrders? 
                    <Loader></Loader>:
                    errorOrders?
                    <Message type="danger">{errorOrders}</Message>:
                    (
                        <Table striped responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.created_at.substring(0,10)}</td>
                                        <td>${order.total_price}</td>
                                        <td>{order.is_paid? order.paid_at.substring(0,10): 
                                            <i className="fas fa-times" style={{color: "red"}}></i>}
                                        </td>
                                        <td><LinkContainer to={`/orders/${order.id}/`}>
                                                <Button className="btn-sm">Details</Button>
                                            </LinkContainer>
                                        </td>   
                                    </tr>
                                ))}

                            </tbody>
                        </Table>

                    )
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ProfilePage