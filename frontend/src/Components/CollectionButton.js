import React from 'react';
import { Button } from 'react-bootstrap';

const CollectionButton = ({ isCollected, onToggle }) => {
    return (
        <Button className="ticket-purchase-button" onClick={onToggle}>
            Collect
            {/* <FontAwesomeIcon icon={faTicketAlt} className="ticket-icon" color={isCollected ? '#ff0046' : '#011f29'}/> */}
        </Button>
    );
};

export default CollectionButton;
