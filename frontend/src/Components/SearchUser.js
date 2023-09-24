import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import MyModal from './MyModal';

const SearchUser = () => {
    const [email, setEmail] = useState('');
    const [searchedUser, setSearchedUser] = useState(null);
    const [textModal, setTextModal] = useState(null);
    const [smShow, setSmShow] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        // Use a regular expression to validate the email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setIsValidEmail(emailRegex.test(inputEmail));
    };

    const handleSearchUser = async (email) => {
        const searchUserApiUrl = 'http://localhost:5001/users/get_by_email/' + email;
        try {
            const response = await fetch(searchUserApiUrl);
            if (response.status === 200) {
                const user = await response.json();
                setSearchedUser(user.user);
            } else if (response.status === 400) {
                setSearchedUser('Not found');
            } else {
                throw new Error('Failed to fetch user');
            }
        } catch (error) {
            setTextModal('Failed to find the user with the email!')
            setSmShow(true)
            console.error('Failed to fetch user:', error);
        }
    }

    const handleSendRequest = (friend_id) => {
        const createRequestApiUrl = 'http://localhost:5003/friends/create_request';
        fetch(createRequestApiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: sessionStorage.getItem('user_id'),
                friend_id: friend_id,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setTextModal('Request has been sent to your friend!')
                    setSmShow(true)
                } else if (response.status === 400) {
                    setTextModal('Have already sent a request to this user!')
                    setSmShow(true)
                } else {
                    setTextModal('Error in the send of request!')
                    setSmShow(true)
                }
            })
            .catch((error) => {
                setTextModal('Failed to send the request!')
                setSmShow(true)
                console.error('Failed to send the request:', error);
            });
    };

    return (
        <Container className="mt-4">
            {
                smShow ? <MyModal setShowModal={setSmShow} text={textModal} title={"Request"} flagCloseFunction={true} closeFunction={() => { setSmShow(false) }}></MyModal> : <></>
            }
            <Row>
                <Col>
                    <Form.Group controlId="email" className='mb-4'>
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={!isValidEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="form-button" onClick={() => handleSearchUser(email)}>
                        Search User
                    </Button>
                </Col>
            </Row>
            {searchedUser ? (
                searchedUser === 'Not found' ? (
                    <div className="mt-8">
                        <h4 className="mt-4">No user exist wit the provided email!</h4>
                    </div>
                ) : (searchedUser.id !== parseInt(sessionStorage.getItem('user_id')) ? (
                    <Row>
                        <Col>
                            <Card className="mt-4 card-news">
                                <Card.Body>
                                    <Card.Title>{searchedUser.name}</Card.Title>
                                    <Card.Text>Email: {searchedUser.email}</Card.Text>
                                    {false ? (
                                        <Button className='form-button-outline me-4 disabled' >
                                            <FontAwesomeIcon icon={faCheck} /> Already sent
                                        </Button>
                                    ) : (
                                        <Button className='form-button-profile me-4' onClick={() => handleSendRequest(searchedUser.id)}>
                                            <FontAwesomeIcon icon={faCheck} /> Send Request
                                        </Button>
                                    )}

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <div className="mt-8">
                        <h4 className="mt-4">This is your email, try another one!</h4>
                    </div>
                )
                )) : <></>}
        </Container>

    );
};

export default SearchUser;
