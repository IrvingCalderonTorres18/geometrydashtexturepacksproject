// Overlay.js
import React from 'react';

const Overlay = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div
      className="fixed inset-0 bg-black opacity-50 z-40"
      onClick={onClose} // Cerrar el modal al hacer clic en el overlay
    ></div>
  ) : null;
};

export default Overlay;