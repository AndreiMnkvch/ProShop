import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingInfo } from "../features/cart/cartSlice";
import CheckOutSteps from '../components/CheckoutSteps';

function ShippingPage() {


  const [shippingForm, setShippingForm] = useState({address: '', city: '', postalCode: '', country: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingInfo(shippingForm))
    navigate('/payment')
    
  }

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setShippingForm((prev) => ({
    ...prev,
    [name]: value,
    }));
};

  return (
    <FormContainer>
      <CheckOutSteps></CheckOutSteps>
      <Form onSubmit={submitHandler}>
        <h1>Shipping</h1>

        <FormGroup controlId="address">
          <Form.Label>Address</Form.Label>
            <Form.Control
                required
                placeholder="Enter address"
                value={shippingForm.address}
                name="address"
                onChange={onChangeHandler}
            ></Form.Control>
        </FormGroup>

        <FormGroup controlId="city">
          <Form.Label>City</Form.Label>
            <Form.Control
                required
                placeholder="Enter city"
                value={shippingForm.city}
                name="city"
                onChange={onChangeHandler}
            ></Form.Control>
        </FormGroup>
        
        <FormGroup controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
            <Form.Control
                required
                placeholder="Enter postal code"
                value={shippingForm.postalCode}
                name="postalCode"
                onChange={onChangeHandler}
            ></Form.Control>
        </FormGroup>
        
        <FormGroup controlId="country">
          <Form.Label>Country</Form.Label>
            <Form.Control
                required
                placeholder="Enter country"
                value={shippingForm.country}
                name="country"
                onChange={onChangeHandler}
            ></Form.Control>
        </FormGroup>
      
      <Button type="submit" variant="primary">
        Continiue
      </Button>

      </Form>
    </FormContainer>
  )
}
export default ShippingPage