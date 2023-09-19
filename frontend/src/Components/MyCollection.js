import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CollectionButton from './CollectionButton';

const MyCollection = ({ collection: initialFavorites, onAddToFavorites, updatedFavorites }) => {
    const [favorites, setCollection] = useState(initialFavorites);

    useEffect(() => {
        setCollection(updatedFavorites);
    }, [updatedFavorites]);

    const toggleCollected = (index) => {
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
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                    <Button
                                        className="form-button"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </Button>
                                    <CollectionButton isCollected={true} onToggle={() => toggleCollected(index)} />
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

export default MyCollection;