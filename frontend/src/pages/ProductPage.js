import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProducts } from '../features/products/productsSlice'
import { createProductReview, productReviewCreateReset  } from '../features/reviews/createProductReviewSlice'

function ProductPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { productId } = useParams();
    
    const productsData = useSelector((state) => state.products)
    const {error, isLoading, products} = productsData
    const product = products[productId-1]
    
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')

    const loginUserData = useSelector((state)=> (state.loginUser))
    const {userInfo} = loginUserData

    const productReviewCreateData = useSelector((state) => state.productReviewCreate)
    const {isLoading:isCreatingReview, error: errorReviewCreate, isCreated} = productReviewCreateData 
    

    useEffect(() => {
        if(isCreated){
            setRating(0)
            setComment('')
            dispatch(productReviewCreateReset())
        }

        if (products.length === 0 && !isLoading) {
            dispatch(fetchProducts());
        } 
    }, [products, isLoading, dispatch]);
    
    const addToCartHandler = (event) => {
        event.preventDefault();
        navigate(`/cart/${productId}?qty=${qty}`) 
    }

    const submitHandler = () => {
        dispatch(createProductReview(
            {
                "rating": rating,
                "comment": comment,
                "productId": productId,
            }
        ))

    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go back</Link>
            { products.length === 0 || isLoading  
            ? <Loader />
            : error ? <Message variant='danger'> {error}</Message>
                :
                <div>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item >
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825"/>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    {product.description}            
                                </ListGroup.Item>
                            </ListGroup>  
                        </Col>

                        <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            { product.countInStock > 0 && ( 
                                <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col xs='auto' className='my-1'>
                                    <Form.Control
                                        as="select"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                    >
                                        {
                                        [...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x+1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))
                                        }
                                    </Form.Control>
                                    </Col>
                                </Row>
                                </ListGroup.Item> )
                            }

                            <ListGroup.Item>
                                <Row>
                                <Button
                                    onClick={addToCartHandler}
                                    className="btn-block" 
                                    disabled={product.countInStock === 0} 
                                    type="button">
                                    Add to Cart
                                </Button>
                                </Row>
                            </ListGroup.Item>

                            </ListGroup>
                        </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {product.reviews.length === 0 && <Message variant="info">No reviews yet </Message>}

                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color="#f8e825"></Rating>
                                        <p>{review.created_at.substring(0,16)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                                    <ListGroup.Item>
                                        <h4>Write a review</h4>

                                        {isCreatingReview && <Loader></Loader>}
                                        {errorReviewCreate && <Message variant="danger">{errorReviewCreate}</Message>}
                                        {isCreated && <Message variant="success">Review has been successfully submitted</Message>}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}>
                                                        <option value=''>Select ...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='comment'>
                                            <Form.Label>Review</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='5'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>

                                            <Button
                                                disabled={isCreatingReview}
                                                type="submit"
                                                variant="primary"
                                            >Submit
                                            </Button>

                                            </Form>
                                        ): (
                                            <Message variant="info">Please <Link to='/login'>login</Link></Message>
                                        )}
                                    </ListGroup.Item>
                        </Col>
                    </Row>
                </div>
            }            
        </div>
    )
}

export default ProductPage
