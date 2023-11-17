import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {getOrdersAdmin} from "../features/orders/ordersListAdminSlice"


function OrdersListPage() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ordersList = useSelector(state => state.ordersListAdmin)
    const {orders, error, isLoading} = ordersList

    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    
    useEffect(()=> {
        console.log("useEffect ", userInfo  )
        if (userInfo && userInfo.is_staff){
            dispatch(getOrdersAdmin())
        } else {
            navigate("/login")
        }
    }, [dispatch, navigate, userInfo])

    
    return (
        <div>
            <h1>Orders</h1>
            { isLoading?
            (<Loader></Loader>) :
            error?
            (<Message variant="danger">{error}</Message>) :
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>PAID</th>  
                            <th>DELIVERED</th> 
                            <th>TOTAL PRICE</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map( order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user.username}</td>
                                <td>{order.created_at.substring(0,10)}</td>
                                <td>{order.is_paid? order.paid_at.substring(0,10):
                                    (<i className="fas fa-check" style={{color: "red"}}></i>)}
                                </td>
                                <td>{order.is_delivered? order.delivered_at.substring(0, 10):
                                    (<i className="fas fa-check" style={{color: "red"}}></i>)}
                                </td>
                                <td>{order.total_price}</td>
                                <td>
                                <td><LinkContainer to={`/orders/${order.id}/`}>
                                                <Button className="btn-sm">Details</Button>
                                            </LinkContainer>
                                </td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }
        </div>
    )
}

export default OrdersListPage