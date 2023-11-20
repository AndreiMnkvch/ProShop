import React, {useState} from 'react'
import { Button,Form,  } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setQuery } from '../features/searchQuery/searchQueryslice'


function SearchBox() {

    const navigate = useNavigate()
    const location = useLocation()
    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch()


    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            dispatch(setQuery(keyword))
            navigate(`/?keyword=${keyword}`)
        }else{  
            navigate(`${location.pathname}`)
        }
    } 
    return (
        <>
            <Form onSubmit={submitHandler} inline className="d-flex" >
                <Form.Control
                    type='text'
                    name='query'
                    onChange={(e)=> setKeyword(e.target.value)}
                    className='mr-sm-2 ml-sm-5'
                ></Form.Control>

                <Button
                    type='submit'
                    variant='outline-success'
                    className='p-2'
                    >Submit
                </Button>
            </Form>
        </>
    )
}

export default SearchBox;