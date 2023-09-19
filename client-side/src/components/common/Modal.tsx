import React from "react";
import "../../assets/css/common/Modal.css";

interface ModalProps {
  onModalClose(): void;
  isModalOpen: boolean;
  children: React.ReactNode;
}

function Modal({ onModalClose, isModalOpen, children }: ModalProps) {
  return (
    <div className={`modal ${isModalOpen ? "active" : ""}`} id="modal">
      <div className="modal_content">{children}</div>

      <div className="modal_close">
        <p onClick={onModalClose}>&times;</p>
      </div>
    </div>
  );
}

export default Modal;
