import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {getProfileDetails, profileDetailsReset} from "../features/profileDetails/profileDetailsSlice"
import { updateProfileDetailsByAdmin, updateProfileByAdminReset } from "../features/updateProfileDetailsAdmin/updateProfileDetailsAdminSlice";


function EditUserPage() {

    const {userId} = useParams();
    const navigate = useNavigate()
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const profileDetails = useSelector((state) => state.profileDetails);
    const { profileInfo, error, isLoading } = profileDetails;
    
    const updateProfileByAdmin = useSelector((state) => state.updateProfileByAdmin);
    const { isUpdating, error:errorUpdate, isUpdated } = updateProfileByAdmin;

    const dispatch = useDispatch();

    useEffect(() => {
        if(isUpdated){
            dispatch(updateProfileByAdminReset())
            dispatch(profileDetailsReset())
            navigate("/admin/users")
        }

        if(!profileInfo.username || profileInfo.id !== Number(userId)){
            if(!isLoading){
                dispatch(getProfileDetails(userId))
            }
        }else{
            setUsername(profileInfo.username)
            setEmail(profileInfo.email)
            setIsAdmin(profileInfo.is_staff)
        }
    }, [dispatch, profileInfo, userId, isLoading, navigate, isUpdated]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateProfileDetailsByAdmin(
            {
                "id": userId,
                "username": username,
                "email": email,
                "is_staff": isAdmin
            }
        ))
    };

    return (
        <div>
            <Link to="/admin/users">
                Go back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {isLoading? <Loader></Loader>: error? <Message variant="danger">{error}</Message> : 
                (
                <Form onSubmit={submitHandler}>

                    <FormGroup controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            placeholder="Enter username"
                            value={username}
                            name="username"
                            onChange={(e)=> setUsername(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            name="email"
                            onChange={(e)=> setEmail(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId="isadmin">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e)=> setIsAdmin(e.target.checked)}
                        ></Form.Check>
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

export default EditUserPage;
