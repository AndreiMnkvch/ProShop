import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { updateProduct, updateProductReset } from "../features/products/productUpdateSlice";
import { fetchProductById } from "../features/products/productDetailsSlice";


function ProductEditPage() {

    const {productId} = useParams();
    const navigate = useNavigate()
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");

    const productsData = useSelector((state) => state.productDetails)
    const {error, isLoading, product} = productsData
    
    
    const updateProductData = useSelector((state) => state.updateProduct);
    const { isUpdating, error:errorUpdate, isUpdated, isLoading:isLoadingUpdate } = updateProductData;

    const dispatch = useDispatch();

    useEffect(() => {
        if(isUpdated){
            dispatch(updateProductReset())
            dispatch(fetchProductById(productId))
            navigate("/admin/products")
        }

        if(!product || product.id !== Number(productId)){
            if(!isLoading){
                dispatch(fetchProductById(productId))
            }
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [dispatch, product, productId, isLoading,isUpdated, navigate]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateProduct(
            {
                "id": productId,
                "name": name,
                "price": price,
                // "image": image,
                "brand": brand,
                "category": category,
                "countInStock": countInStock,
                "description": description
            }
        ))
    };

    return (
        <div>
            <Link to="/admin/products">
                Go back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {isLoadingUpdate && <Loader></Loader>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} 
                {isLoading? <Loader></Loader>: error? <Message variant="danger">{error}</Message> : 
                (
                <Form onSubmit={submitHandler}>

                    <FormGroup controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            value={name}
                            name="username"
                            onChange={(e)=> setName(e.target.value)}
                        ></Form.Control>
                    </FormGroup>
                    
                    <FormGroup controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            placeholder="Enter price"
                            type="number"
                            value={price}
                            name="price"
                            onChange={(e)=> setPrice(e.target.value)}
                        ></Form.Control>
                    </FormGroup>
                
                    <FormGroup controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            placeholder="Enter image"
                            type="text"
                            value={image}
                            name="image"
                            onChange={(e)=> setImage(e.target.value)}
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            placeholder="Enter brand"
                            type="text"
                            value={brand}
                            name="brand"
                            onChange={(e)=> setBrand(e.target.value)}
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup controlId="countinstock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            placeholder="Enter Count In Stock"
                            type="text"
                            value={countInStock}
                            name="countinstock"
                            onChange={(e)=> setCountInStock(e.target.value)}
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            placeholder="Enter category"
                            type="text"
                            value={category}
                            name="category"
                            onChange={(e)=> setCategory(e.target.value)}
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            placeholder="Enter description"
                            type="text"
                            value={description}
                            name="description"
                            onChange={(e)=> setDescription(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>

                </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductEditPage;
