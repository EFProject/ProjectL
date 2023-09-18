import React, { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const NewsList = ({ data, favorites: initialFavorites, onAddToFavorites }) => {
  console.log(data)
  const [favorites, setFavorites] = useState(initialFavorites);

  const toggleFavorite = (index) => {
    const isFavorite = favorites.some((fav) => fav.title === data.articles[index].title);
    const item = data.articles[index];
    if (isFavorite) {
      const deletePref = favorites.find((fav) => fav.title === item.title);
      setFavorites(favorites.filter((fav) => fav.title !== item.title));
      console.log(deletePref)
      onAddToFavorites(deletePref, true);
    } else {
      const newItem = { title: item.title, author: item.author, urlToImage: item.urlToImage, published_at: item.publishedAt, user_id: sessionStorage.getItem('user_id'), url: item.url };

      setFavorites([...favorites, item]);

      onAddToFavorites(newItem, false);
    }
  };

  return (
    <Container className="mt-4">
      {data.status !== 'ok' ? (
        <p>Loading news...</p>
      ) : (
        <Row>
          {data.articles.map((item, index) => {
            const publishedDate = item.publishedAt.split('T')[0];

            const isFavorite = favorites.some((favorite) => favorite.title === item.title);

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
                    <FavoriteButton isFavorite={isFavorite} onToggle={() => toggleFavorite(index)} />
                  </Card.Body>
                  <Card.Footer className="text-white text-center bg-dark">{publishedDate}</Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default NewsList;
