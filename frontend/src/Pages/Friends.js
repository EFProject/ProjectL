import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import FriendsList from '../Components/FriendsList';
import RequestsList from '../Components/RequestsList';
import SearchUser from '../Components/SearchUser';

function Friends() {
    const [selectedTab, setSelectedTab] = useState('Friends');

    return (
        <div>
            <Container className="mt-4 mb-4">
                <Button
                    className={`${selectedTab === 'Friends' ? 'form-button' : 'outline-form-button'
                        } me-4`}
                    onClick={() => setSelectedTab('Friends')}
                >
                    <h4 className="m-2">Friends</h4>
                </Button>
                <Button
                    className={`${selectedTab === 'Requests' ? 'form-button' : 'outline-form-button'
                        } ms-4 me-4`}
                    onClick={() => setSelectedTab('Requests')}
                >
                    <h4 className="m-2">Requests</h4>
                </Button>
                <Button
                    className={`${selectedTab === 'Users' ? 'form-button' : 'outline-form-button'
                        } ms-4`}
                    onClick={() => setSelectedTab('Users')}
                >
                    <h4 className="m-2">Search a user</h4>
                </Button>
            </Container>
            {selectedTab === 'Friends' && (
                <>
                    <FriendsList setSelectedTab={setSelectedTab} />
                </>
            )}
            {selectedTab === 'Requests' && (
                <>
                    <RequestsList />
                </>
            )}
            {selectedTab === 'Users' && (
                <>
                    <SearchUser />
                </>
            )}
        </div>
    );
}

export default Friends;