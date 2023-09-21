import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const CollectionButton = ({ isCollected, onToggle }) => {
    return (
        <Button
            className={isCollected ? 'preferiti-button pb-active' : 'preferiti-button pb-disabled'}
            onClick={onToggle}
         >
        {isCollected ? "Remove  " : "Collect  "}
        <FontAwesomeIcon
            icon={faTicketAlt}
            color={isCollected ? '#ff0046' : '#011f29'}
        />
      </Button>
    );
};

export default CollectionButton;
