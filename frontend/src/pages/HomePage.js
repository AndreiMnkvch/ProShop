import { React, useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProducts } from '../features/products/productsSlice'


function HomePage() {

const dispatch = useDispatch()

const productsData = useSelector((state) => state.products)
const {error, isLoading, products} = productsData

useEffect(() => {
    if (products.length === 0 && !isLoading && !error) {
        dispatch(fetchProducts());
    }
}, [products, isLoading, dispatch, error]);

return (
    <div>
        <h1>Latest products </h1>
        { isLoading
            ? <Loader />
            : error ? <Message variant='danger'> {error}</Message>
                :
                <Row>
                    { products.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product key={product.id} product={product} />
                        </Col>
                    ))
                }
                </Row>
        }
        
    </div>
)
}
export default HomePage
