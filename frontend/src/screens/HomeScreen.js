import { React, useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { fetchProducts } from '../features/products/productsSlice'


function HomeScreen() {

  const dispatch = useDispatch()
  const productItems = useSelector((state) => state.products.products)
  const productsAreLoading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)
    
  // const error = useSelector(state => state.products.error)

  useEffect(() => {
    if  (productsAreLoading) {
      dispatch(fetchProducts());
    }
  }, [ productsAreLoading, dispatch ]);

  return (
    <div>
      <h1>Latest products </h1>
        { productsAreLoading ? <h1>Loading...</h1>
          : error ? <h3>{error}</h3>
            :
            <Row>
              { productItems.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
                ))
              }
            </Row>
        }
        
    </div>
  )
}

export default HomeScreen
