import React from 'react';

const Modal = ({ setShowModal, text, title}) => {

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className={`modal show`} tabIndex="-1" role="dialog" style={{ display: 'block'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: 'black' }}>{title}</h5>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ color: 'black' }}>
              <p>{text}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
