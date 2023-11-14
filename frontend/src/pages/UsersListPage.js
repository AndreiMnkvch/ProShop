import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../features/usersList/usersListSlice";
import { deleteUser } from "../features/userDelete/userDeleteSlice";


function UsersListPage() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const usersList = useSelector(state => state.usersList)
    const {users, error, isLoading} = usersList

    const userDelete = useSelector(state => state.userDelete)
    const {isDeleted, error: errorDelete, isLoading: isLoadingDelete} = userDelete

    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    
    useEffect(()=> {
        if (userInfo && userInfo.is_staff){
            dispatch(getUsersList())
        } else {
            navigate("/login")
        }
    }, [dispatch, navigate, userInfo, isDeleted])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?'))
        {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
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
                            <th>EMAIL</th>
                            <th>ADMIN</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.is_staff?
                                    (<i className="fas fa-check" style={{color: "green"}}></i>) :
                                    (<i className="fas fa-times" style={{color: "red"}}></i>)
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user.id}`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user.id)}>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }
        </div>
    )
}

export default UsersListPage