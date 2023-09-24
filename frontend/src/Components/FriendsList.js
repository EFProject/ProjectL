import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FriendCard = ({ friend, onDelete }) => {
    const [friendInfo, setFriendInfo] = useState(null);

    useEffect(() => {
        const fetchFriendInfo = async () => {
            const friendsApiUrl = 'http://localhost:5001/users/' + friend.friend_id;
            try {
                const response = await fetch(friendsApiUrl);
                if (response.status === 200) {
                    const data = await response.json();
                    setFriendInfo(data.user);
                } else {
                    throw new Error('Failed to fetch friend');
                }
            } catch (error) {
                console.error('Failed to fetch friend:', error);
            }
        };

        fetchFriendInfo();
    }, [friend.friend_id]);

    return (
        <Col sm={12} md={6} lg={6} xl={6}>
            <Card className="mb-4 card-news">
                <Card.Body>
                    {friendInfo ? (
                        <>
                            <Card.Title>Name: {friendInfo.name}</Card.Title>
                            <Card.Text>Email: {friendInfo.email}</Card.Text>
                        </>
                    ) : (
                        <span className="sr-only">Loading friends...</span>
                    )}
                    <Button className='form-button' onClick={() => onDelete(friend.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Remove
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

const FriendsList = ({ setSelectedTab }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            setIsLoading(true);
            const friendsApiUrl = 'http://localhost:5003/friends/' + sessionStorage.getItem('user_id');
            fetch(friendsApiUrl)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch friends');
                    }
                })
                .then((friendsData) => {
                    setFriends(friendsData.friends);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch friends:', error);
                });
        };

        fetchFriends();
    }, []);

    const handleDeleteFriend = async (friendId) => {
        const deleteApiUrl = 'http://localhost:5003/friends/' + friendId + '/cancel_friend';
        try {
            const response = await fetch(deleteApiUrl, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
            } else {
                window.alert('Failed to remove it from friends');
                throw new Error('Failed to delete friend');
            }
        } catch (error) {
            window.alert('Failed to remove it from friends');
            console.error('Failed to delete friend:', error);
        }
    };

    return (
        <Container className="mt-4">
            {isLoading ? (
                <span className="sr-only">Loading friends...</span>
            ) : friends && friends.length > 0 ? (
                <>
                    <Row>
                        {friends.map((friend) => (
                            <FriendCard key={friend.id} friend={friend} onDelete={handleDeleteFriend} />
                        ))}
                    </Row>
                </>
            ) : (
                <div className="mt-8">
                    <h4 className="mt-4">You have not added any friends.</h4>
                    <Button className={'form-button'} onClick={() => setSelectedTab('Users')}>
                        Search for Friends
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default FriendsList;
