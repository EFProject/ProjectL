import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

function CardProfile() {
    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [myNewsAmount, setMyNewsAmount] = useState(0)

    function fetchFavorites() {
		const favoritesApiUrl = 'http://localhost:5000/news/' + sessionStorage.getItem('user_id');
		fetch(favoritesApiUrl)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Failed to fetch favorites');
				}
			})
			.then((favoritesData) => {
				setMyNewsAmount(favoritesData.news.length);
			})
			.catch((error) => {
				console.error('Error fetching favorites:', error);
			});
	};

	function fetchUserInfo() {
		const userApiUrl = 'http://localhost:5001/users/' + sessionStorage.getItem('user_id');
		fetch(userApiUrl)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Failed to fetch user');
				}
			})
			.then((currentUser) => {
				setUserName(currentUser.user.name);
				setUserEmail(currentUser.user.email);
			})
			.catch((error) => {
				console.error('Error fetching user:', error);
			});
	};

    useEffect(() => {
		fetchUserInfo()
        fetchFavorites()
	}, []);


    return (
        <Card className="mb-3" bg='dark' text='white'>
        <Card.Header bg='dark' text='white'><h4>Dettagli Profilo</h4></Card.Header>
        <Card.Body bg='dark' text='white'><strong>Email:</strong> {userEmail}</Card.Body>
        <hr className="hr-card"></hr>
        <Card.Body bg='dark' text='white'><strong>Nome:</strong> {userName}</Card.Body>
        <hr className="hr-card"></hr>
        <Card.Body bg='dark' text='white'><strong>My News:</strong> {myNewsAmount}</Card.Body>
        </Card>
    );
}

export default CardProfile;