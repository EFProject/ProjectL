import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Modal from './Modal';

const CollectionButton = ({ item, isCollected, onToggle }) => {

    const [showModal, setShowModal] = useState(false);

    const toggleInfo = () =>{
      setShowModal(true);
    }

    return (
        <>
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
        {item.info ? 
        <><Button
            className="preferiti-button pb-active"
            onClick={() => toggleInfo()}
            >
                More Info
        </Button>
        {showModal ? <Modal setShowModal={setShowModal} text={item.info} title={item.name}></Modal> : <></>}</>
        : <></>}
        </>
    );
};

export default CollectionButton;
