import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CollectionButton from './CollectionButton';

const TicketList = ({ data, collection: initialCollection, onAddToCollection }) => {

  const [collection, setCollection] = useState(initialCollection);

  const toggleCollection = (index) => {
    const isCollected = collection.some((coll) => coll.title === data.articles[index].title);
    const item = data.articles[index];
    if (isCollected) {
      const uncollected = collection.find((coll) => coll.title === item.title);
      setCollection(collection.filter((coll) => coll.title !== item.title));
      console.log(uncollected)
      onAddToCollection(uncollected, true);
    } else {
      const newItem = { title: item.title, author: item.author, urlToImage: item.urlToImage, published_at: item.publishedAt, user_id: sessionStorage.getItem('user_id'), url: item.url };

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
                    src={!item.images[0] ? '/default.jpg' : item.images[0].url}
                    className="img-card img-fluid"
                    style={{ objectFit: 'scale-down' }}
                    onError={handleImageError}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.priceRanges ? <>Price : {item.priceRanges[0].min} - {item.priceRanges[0].max} {item.priceRanges[0].currency}</> : <></>}</Card.Text>
                    <Button
                      className="form-button"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Purchase
                    </Button>
                    <CollectionButton item={item} isCollected={isCollected} onToggle={() => toggleCollection(index)} />
                  </Card.Body>
                  <Card.Footer className="text-white text-center bg-dark">{item.dates ? item.dates.start.localDate : <></>}</Card.Footer>
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
