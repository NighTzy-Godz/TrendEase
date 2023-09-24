import React from "react";
import "../../assets/css/common/Modal.css";

interface ModalProps {
  className?: string;
  onModalClose(): void;
  isModalOpen: boolean;
  children: React.ReactNode;
}

function Modal({
  onModalClose,
  className = "",
  isModalOpen,
  children,
}: ModalProps) {
  return (
    <div
      className={`modal ${className}  ${isModalOpen ? "active" : ""}`}
      id="modal"
    >
      <div className="modal_content">
        {children}
        <div className="modal_close">
          <p onClick={onModalClose}>&times;</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
