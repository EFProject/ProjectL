import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const NewsList = ({ data }) => {
  const { news } = data;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Latest News</h1>
      {!news ? (
        <p>Loading news...</p>
      ) : (
        <Row>
          {news.map((item) => (
            <Col md={4} key={item.id}>
              <Card className="mb-4">
                <Card.Img src={item.imageUrl}/>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="primary"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NewsList;
