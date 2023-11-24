import React from 'react'
import { Pagination } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function Paginate({lastPage, currentPage, keyword='', isAdmin=false}) {
    console.log("paginate component keyword: ", keyword)
    

    return (lastPage > 1 && (
        <Pagination>
            {[...Array(lastPage).keys()].map((page) => (
                <LinkContainer
                    key={page + 1}
                    to={
                        isAdmin?
                        `/admin/products?keyword=${keyword}&page=${page + 1}`:
                        `/?keyword=${keyword}&page=${page + 1}`
                    }
                >
                    <Pagination.Item active={(page + 1) === currentPage}>{page + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    ))
}

export default Paginate