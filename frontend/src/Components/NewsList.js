import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const NewsList = ({ data }) => {
  console.log(data.articles);
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Latest News</h1>
      {data.status !== 'ok' ? (
        <p>Loading news...</p>
      ) : (
        <Row>

          {data.articles.map((item) => (
            <Col xs={12} sm={12} md={6} lg={6} key={item.id}>
              <Card className="mb-4 card-news">
                <Card.Img src={!item.urlToImage ? '/default.jpg' : item.urlToImage} className="img-fluid" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    className='form-button'
                    href={item.url}
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
