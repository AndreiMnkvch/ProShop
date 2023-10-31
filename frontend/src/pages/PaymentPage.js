import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Form, FormGroup, Col } from 'react-bootstrap'
import {savePaymentMethod} from '../features/cart/cartSlice.js'

function PaymentPage() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }


    if (!shippingAddress.address){
        navigate('/shipping')
    }
    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>

            <CheckoutSteps step1 step2 step3 />
            
            <FormGroup>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or credit card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e)=> setPaymentMethod(e.target.value)}>

                    </Form.Check>
                </Col>
            </FormGroup>
                <Button type='submit' variant='primary'>Continiue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage