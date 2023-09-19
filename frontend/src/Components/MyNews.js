import React, { useState, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MyNews = ({ favorites: initialFavorites, onAddToFavorites, updatedFavorites }) => {
    const [favorites, setFavorites] = useState(initialFavorites);

    useEffect(() => {
        setFavorites(updatedFavorites);
    }, [updatedFavorites]);

    const toggleFavorite = (index) => {
        onAddToFavorites(favorites[index], true);
    };

    return (
        <Container className="mt-4">
            <Row>
                {favorites.map((item, index) => {
                    const publishedDate = item.published_at.split('T')[0];

                    const handleImageError = (e) => {
                        e.target.src = '/default.jpg';
                    };

                    return (
                        <Col xs={12} sm={12} md={6} lg={6} key={index}>
                            <Card className="mb-4 card-news">
                                <Card.Img
                                    src={!item.urlToImage ? '/default.jpg' : item.urlToImage}
                                    className="img-card img-fluid"
                                    style={{ objectFit: 'scale-down' }}
                                    onError={handleImageError}
                                />
                                <Card.Body>
                                    <Card.Title>{item.title.substring(0, item.title.lastIndexOf('-'))}</Card.Title>
                                    <Card.Text>{item.author}</Card.Text>
                                    <Button
                                        className="form-button"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </Button>
                                    <FavoriteButton isFavorite={true} onToggle={() => toggleFavorite(index)} />
                                </Card.Body>
                                <Card.Footer className="text-white text-center bg-dark">{publishedDate}</Card.Footer>
                            </Card>
                        </Col>
                    );
                }
                )}
            </Row>
        </Container>
    );
};

export default MyNews;