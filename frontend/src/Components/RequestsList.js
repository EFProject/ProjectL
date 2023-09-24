import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const RequestCard = ({ request, onDelete, onConfirm }) => {
    const [requestInfo, setRequestInfo] = useState(null);

    useEffect(() => {
        const fetchRequestInfo = async () => {
            const friendsApiUrl = 'http://localhost:5001/users/' + request.user_id;
            try {
                const response = await fetch(friendsApiUrl);
                if (response.status === 200) {
                    const data = await response.json();
                    setRequestInfo(data.user);
                } else {
                    throw new Error('Failed to fetch request');
                }
            } catch (error) {
                console.error('Failed to fetch request:', error);
            }
        };

        fetchRequestInfo();
    }, [request.user_id]);

    return (
        <Col sm={12} md={6} lg={6} xl={6}>
            <Card className="mb-4 card-news">
                <Card.Body>
                    {requestInfo ? (
                        <>
                            <Card.Title>Name: {requestInfo.name}</Card.Title>
                            <Card.Text>Email: {requestInfo.email}</Card.Text>
                        </>
                    ) : (
                        <span className="sr-only">Loading request info...</span>
                    )}
                    <Button className='form-button-profile me-4' onClick={() => onConfirm(request.id)}>
                        <FontAwesomeIcon icon={faCheck} /> Accept
                    </Button>
                    <Button className='form-button' onClick={() => onDelete(request.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Remove
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

const RequestsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            const friendsApiUrl = 'http://localhost:5003/friends/requests/' + sessionStorage.getItem('user_id');
            fetch(friendsApiUrl)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch requests');
                    }
                })
                .then((friendsData) => {
                    setRequests(friendsData.friends);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch requests:', error);
                });
        };

        fetchRequests();
    }, []);

    const handleDeleteRequest = async (requestId) => {
        const deleteApiUrl = 'http://localhost:5003/friends/' + requestId + '/delete_request';
        try {
            const response = await fetch(deleteApiUrl, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                setRequests((prevRequests) => prevRequests.filter((reuqest) => reuqest.id !== requestId));
            } else {
                window.alert('Failed to remove it from requests');
                throw new Error('Failed to delete request');
            }
        } catch (error) {
            window.alert('Failed to remove it from requests');
            console.error('Failed to delete request:', error);
        }
    };

    const handleConfirmRequest = async (requestId) => {
        const confirmApiUrl = 'http://localhost:5003/friends/' + requestId + '/accept_request';
        try {
            const response = await fetch(confirmApiUrl, {
                method: 'PUT',
            });
            if (response.status === 200) {
                setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
            } else {
                window.alert('Failed to accept request');
                throw new Error('Failed to accept request');
            }
        } catch (error) {
            window.alert('Failed to accept request');
            console.error('Failed to accept request:', error);
        }
    };

    return (
        <Container className="mt-4">
            {isLoading ? (
                <span className="sr-only">Loading requests...</span>
            ) : requests && requests.length > 0 ? (
                <>
                    <Row>
                        {requests.map((request) => (
                            <RequestCard key={request.id} request={request} onDelete={handleDeleteRequest} onConfirm={handleConfirmRequest} />
                        ))}
                    </Row>
                </>
            ) : (
                <div className="mt-8">
                    <h4 className="mt-4">You have not recived any requests.</h4>
                </div>
            )}
        </Container>
    );
};

export default RequestsList;
