import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const NewsList = ({ data }) => {

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Latest News</h1>
      {data.status !== 'ok' ? (
        <p>Loading news...</p>
      ) : (
        <Row>

          {data.articles.map((item, index) => {
            const publishedDate = item.publishedAt.split('T')[0];
            const handleImageError = (e) => {
              e.target.src = '/default.jpg'; // Set a default image on error
            };
            return (
              <Col xs={12} sm={12} md={6} lg={6} key={index} >
                <Card className="mb-4 card-news">
                  <Card.Img
                    src={!item.urlToImage ? '/default.jpg' : item.urlToImage}
                    className="img-card img-fluid" style={{ objectFit: 'scale-down' }}
                    onError={handleImageError}
                  />
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
                  <Card.Footer className='text-white text-center bg-dark'>{publishedDate}</Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )
      }
    </Container >
  );
};

export default NewsList;
