import { Button } from 'react-bootstrap';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

const MyModal = ({ setShowModal, text, title, showConfirmButton, confirmFunction, flagCloseFunction, closeFunction}) => {

  const closeModal = () => {
    setShowModal(false);
    if (flagCloseFunction) {closeFunction()};
  };

  return (
    <Modal centered show={true} onHide={() => closeModal()} >
          <Modal.Header id='ModalHeader' className='footerProfile' closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalProfile text-center'>{text}</Modal.Body>
          <Modal.Footer className='modalProfile footerProfile'>
            <>
             {showConfirmButton ? <Button name='Conferma' type='submit' className='form-button-profile' onClick={confirmFunction}> Confirm </Button> : <></>}
             <Button className='form-button' onClick={() => closeModal()}>Close</Button>
            </>
          </Modal.Footer>
      </Modal>  
  );
}

export default MyModal;
