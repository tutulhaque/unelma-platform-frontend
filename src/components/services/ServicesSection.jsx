import React from "react";
import { useNavigate } from "react-router-dom";

const ServicesSection = ({ service, setIsOpen }) => {
  const navigate = useNavigate();
  const { service_title: title, service_image } = service;

  const image = service_image?.url
    ? `https://unelma-platform-backend.onrender.com${service_image.url}`
    : "https://placehold.co/600x400";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Service Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />

      {/* Title */}
      <div className="px-6 flex-1">
        <h3 className="text-2xl font-bold text-center pt-2 text-gray-800 mb-4">
          {title}
        </h3>
      </div>

      {/* Buttons */}
      <div className="p-4 space-y-3">
        {/* Service Details Button */}
        <button
          onClick={() => navigate(`/services/${service.documentId}`)}
          className="block w-full text-center bg-gradient-to-r from-[#3780B2] to-[#008081] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-l from-[#2a6c97] to-[#008081] hover:shadow-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          Service Details
        </button>

        {/* Get a Quote Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="block w-full text-center bg-[#3780B2] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-[#2a6c97] hover:shadow-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
