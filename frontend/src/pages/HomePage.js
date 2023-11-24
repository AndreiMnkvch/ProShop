import { React, useEffect, useRef } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProducts } from '../features/products/productsSlice'
import { useSearchParams } from 'react-router-dom';
import Paginate from '../components/Paginate'


function HomePage() {

const dispatch = useDispatch()
const [searchParams, setSearchParams] = useSearchParams();
const latestSearchParams = useRef(searchParams);
const productsData = useSelector((state) => state.products)
const {error, isLoading, products, isFulfilled, lastPage, currentPage } = productsData
const keyword = searchParams.get('keyword')
console.log("Home page keyword: ", keyword)

useEffect(() => {
    if (
        (!isFulfilled && !isLoading && !error) || 
        (searchParams.toString() !== latestSearchParams.current.toString()))
    {
        latestSearchParams.current = searchParams;
        console.log(
            "search params: ",
            searchParams.toString(),
            "latest search params :",
            latestSearchParams.current.toString()
        )
        dispatch(fetchProducts(searchParams))
    }
}, [searchParams, isLoading, dispatch, error, isFulfilled]);


return (
    <div>
        <h1>Latest products </h1>
        { isLoading
            ? <Loader />
            : error ? <Message variant='danger'> {error}</Message>
                :
                <>
                    <Row>
                    { products.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product key={product.id} product={product} />
                        </Col>
                    ))
                }
                    </Row>
                <Paginate 
                    lastPage={lastPage}
                    currentPage={currentPage}
                    keyword={keyword? keyword: ''}
                />
                </>
        }
        
    </div>
)
}
export default HomePage
