import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const FavoriteButton = ({ isFavorite, onToggle }) => {
    return (
        <Button className={isFavorite ? 'preferiti-button pb-active' : 'preferiti-button pb-disabled'} onClick={onToggle}>
            <FontAwesomeIcon icon={faHeart} color={isFavorite ? '#ff0046' : '#011f29'} />
        </Button>
    );
};

export default FavoriteButton;
