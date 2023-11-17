import {React, useEffect, useState} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap";
import {useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../features/orders/orderDetailsSlice';
import { payOrder, clearOrderPay } from '../features/orders/orderPaySlice';
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import PayPalCheckoutButton from '../components/PayPalCheckoutButton'
import { clearOrderDeliver, deliverOrder } from '../features/orders/orderDeliverSlice';


function OrderPage() {
    
    const {orderId} = useParams();
    const dispatch = useDispatch()
    
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let itemsPrice;

    const orderDetails = useSelector(state => state.orderDetails)
    const { isLoading, error, order } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { isLoading:isLoadingPay, error: errorPay, success: successPay } = orderPay
    
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { isLoading:isLoadingDeliver, error: errorDeliver, isDelivered } = orderDeliver

    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser

    
    useEffect(() => {
        if (!order || successPay || order.id !== Number(orderId) || isDelivered){
            dispatch(clearOrderPay())
            dispatch(clearOrderDeliver())
            dispatch(getOrderDetails(orderId))}
    }, [order, orderId, dispatch, successPay, isDelivered])

    const deliverHandler = () =>{
        dispatch(deliverOrder(orderId))
    } 
    
    if (order){
        itemsPrice = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0)
    }    

    return error? 
    (<Message variant="danger">{error}</Message>) :
    (isLoading || !order)? (<Loader></Loader>) : 
            (
            <div>
                <h1>Order: {order.id}</h1>
                <Row>
                <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name : </strong>{order.user.username}</p>
                        <p><strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shipping_address.address}
                            &nbsp;  
                            {order.shipping_address.city}
                            &nbsp;
                            {order.shipping_address.postalCode}
                            &nbsp;
                            {order.shipping_address.country} 
                        </p>
                            {order.is_delivered? 
                            (<Message variant="success">Delivered on {order.delivered_at.substring(0,10)}</Message>):
                            (<Message variant="warning">Not delivered</Message>)
                            }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.payment_method}
                            {order.is_paid? 
                            (<Message variant="success">Paid on {order.paid_at.substring(0,10)}</Message>):
                            (<Message variant="warning">Not paid</Message>)
                            }
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        { error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.order_items.length === 0?
                            <Message variant='info' >
                                No orders
                            </Message> :
                            (
                                <ListGroup variant='flush'>
                                    {
                                        order.order_items.map((item) => 
                                        <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            
                                            <Col md={4}>
                                            {item.qty} X ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                            </Col>
                                            
                                            </Row>
                                        </ListGroup.Item>
                                        )
                                    }               
                                </ListGroup>
                            )  
                            }
                        </ListGroup.Item>
                                        
                </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                                        
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item: </Col>
                                    <Col>${itemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                                    
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping </Col>
                                    <Col>${order.shipping_price} </Col>
                                </Row>
                            </ListGroup.Item>
                                    
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax </Col>
                                    <Col>${order.tax_price} </Col>
                                </Row>
                            </ListGroup.Item>
                                    
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.total_price} </Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.is_paid &&
                            <ListGroup.Item>
                                {isLoadingPay && <Loader></Loader>}
                                {isPending? <Loader></Loader>: 
                                isRejected? <Message>Error of PayPal implementation.</Message>:

                                (
                                    <PayPalCheckoutButton order={order} />
                                )}
                            </ListGroup.Item>
                            }
                        </ListGroup>
                        {isLoadingDeliver && <Loader />}
                        {errorDeliver && <Message>{errorDeliver}</Message>}
                        {userInfo && userInfo.is_staff && order.is_paid && !order.is_delivered && 
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>}
                    </Card>
                </Col>
                </Row>
            </div>
    )
}

export default OrderPage