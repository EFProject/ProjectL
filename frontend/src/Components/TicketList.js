import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CollectionButton from './CollectionButton';

const TicketList = ({ data, collection: initialCollection, onAddToCollection }) => {

  const [collection, setCollection] = useState(initialCollection);

  const toggleCollection = (index) => {
    const isCollected = collection.some((coll) => coll.name === data[index].name);
    const item = data[index];
    
    if (isCollected) {
      const uncollected = collection.find((coll) => coll.name === item.name);
      setCollection(collection.filter((coll) => coll.name !== item.name));
      
      onAddToCollection(uncollected, true);
    } else {
      const newItem = { name: item.name, info: item.info, urlToImage: item.urlToImage, localDate: item.localDate, promoter: item.promoter, user_id: sessionStorage.getItem('user_id'), url: item.url };

      setCollection([...collection, item]);

      onAddToCollection(newItem, false);
    }
  };

  return (
    <Container className="mt-4">
      {!data ? (
        <p>Loading tickets...</p>
      ) : (
        <Row>
          {data.map((item, index) => {

            const isCollected = collection.some((collected) => collected.name === item.name);

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
                    <Card.Title>{item.name} <div style={{ fontFamily: 'serif' }}>{item.promoter}</div></Card.Title>
                    {item.priceRanges ? <div style={{ fontFamily: 'serif' }}>Prices from {item.priceRanges.min} to {item.priceRanges.max} {item.priceRanges.currency}</div> : <></>}
                    <Button
                      className="form-button"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Purchase
                    </Button>
                    <CollectionButton item={item} isCollected={isCollected} onToggle={() => toggleCollection(index)} />
                    {item.ticketLimit ? <div id="square-container">
                       <div id="square-message">{item.ticketLimit} tickets limit!</div>
                    </div> : <></>}
                  </Card.Body>
                  <Card.Footer className="text-white text-center bg-dark">{item.localDate}</Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default TicketList;
