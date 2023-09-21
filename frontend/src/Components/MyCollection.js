import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CollectionButton from './CollectionButton';

const MyCollection = ({ initialCollection, onAddToCollection }) => {
    const [collection, setCollection] = useState(initialCollection);

    useEffect(() => {
        setCollection(initialCollection);
    }, [initialCollection]);

    const toggleCollected = (index) => {
        onAddToCollection(collection[index], true);
    };

    return (
        <Container className="mt-4">
            <Row>
                {collection.map((item, index) => {

                    const handleImageError = (e) => {
                        e.target.src = '/default.jpg';
                    };

                    return (
                        <Col xs={12} sm={12} md={6} lg={6} key={index}>
                          <Card className="mb-4 card-news">
                            <Card.Img
                              src={!item.imageUrl ? '/default.jpg' : item.imageUrl}
                              className="img-card img-fluid"
                              style={{ objectFit: 'scale-down' }}
                              onError={handleImageError}
                            />
                            <Card.Body>
                              <Card.Title>{item.name} <div style={{ fontFamily: 'serif' }}>{item.promoter}</div></Card.Title>
                              <Card.Text>{item.priceRanges ? <div style={{ fontFamily: 'serif' }}>Prices from {item.priceRanges.min} to {item.priceRanges.max} {item.priceRanges.currency}</div> : <></>}</Card.Text>
                              <Button
                                className="form-button"
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Purchase
                              </Button>
                              <CollectionButton item={item} isCollected={true} onToggle={() => toggleCollected(index)} />
                              {item.ticketLimit ? <div id="square-container">
                                 <div id="square-message">{item.ticketLimit} tickets limit!</div>
                              </div> : <></>}
                            </Card.Body>
                            <Card.Footer className="text-white text-center bg-dark">{item.localDate}</Card.Footer>
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