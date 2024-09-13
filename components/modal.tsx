/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  closeOnOutsideClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
  height = "max-h-[80vh]",
  closeOnOutsideClick = true,
}) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Close modal on outside click
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-white shadow-lg ${width} ${height} p-6`}
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal title */}
        {title && <h2 className="mb-4 text-center text-xl font-semibold">{title}</h2>}

        {/* Modal content */}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
