import React, { useEffect } from "react";
import { Button, Table, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts} from "../features/products/productsSlice"
import {deleteProduct, productDeleteReset} from "../features/products/productDeleteSlice"
import { productCreateReset, createProduct } from '../features/products/productCreateSlice'
import Paginate from '../components/Paginate'
import { useSearchParams } from 'react-router-dom';



function ProductsListPage() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword')

    const productsInfo = useSelector(state => state.products)
    const {products, error, isLoading, lastPage, currentPage} = productsInfo
    
    const productDelete = useSelector(state => state.productDelete)
    const {isDeleted, error:errorDelete, isLoading:isLoadingDelete} = productDelete
    
    const productCreate = useSelector(state => state.productCreate)
    const {isCreated, error:errorCreate, isLoading:isLoadingCreate, product: createdProduct} = productCreate

    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    
    useEffect(()=> {
        if (isCreated){
            navigate(`/admin/products/${createdProduct.id}/edit`)
            dispatch(productCreateReset())
        }

        if(isDeleted){
            dispatch(fetchProducts(searchParams))
            dispatch(productDeleteReset())
        }

        if (userInfo && userInfo.is_staff){
            dispatch(fetchProducts(searchParams))
        } else {
            navigate("/login")
        }
    }, [dispatch, navigate, userInfo, isDeleted, isCreated, createdProduct, searchParams])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?'))
        {
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct())

    }

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {isLoadingDelete && <Loader></Loader>}
            {errorDelete && <Message variant="danger" >{errorDelete}</Message>}

            {isLoadingCreate && <Loader></Loader>}
            {errorCreate && <Message variant="danger" >{errorCreate}</Message>}

            { isLoading?
            (<Loader></Loader>) :
            error?
            (<Message variant="danger">{error}</Message>) :
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>  
                            <th>BRAND</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {products.map( product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/products/${product.id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product.id)}>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }
            <Paginate 
                lastPage={lastPage}
                currentPage={currentPage}
                keyword={keyword? keyword: ''}
                isAdmin={true}
            />
        </div>
    )
}

export default ProductsListPage