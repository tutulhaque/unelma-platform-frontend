// src/components/ProductDetailsModal.jsx
import React from "react";

const ProductDetailsModal = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-lg rounded-xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>

        {/* Render rich text safely */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: details }}
        />

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#3780B2] text-white py-2 rounded-lg font-medium hover:bg-[#2b6d97] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
