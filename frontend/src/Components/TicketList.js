import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CollectionButton from './CollectionButton';

const TicketList = ({ data, collection, onAddToCollection }) => {

  const toggleCollection = (index) => {
    const isCollected = collection.some((coll) => coll.name === data[index].name && coll.localDate === data[index].localDate);
    var item;
    
    if (isCollected) {
      item = collection.find((coll) => coll.name === data[index].name && coll.localDate === data[index].localDate)
      onAddToCollection(item , true);
    } else {
      item = data[index];
      item = {...item , user_id: sessionStorage.getItem('user_id')};
      onAddToCollection(item, false);
    }

  };

  return (
    <Container className="mt-4">
      {!data ? (
        <p>Loading tickets...</p>
      ) : (
        <Row>
          {data.map((item, index) => {

            const isCollected = collection.some((coll) => coll.name === item.name && coll.localDate === item.localDate);

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
