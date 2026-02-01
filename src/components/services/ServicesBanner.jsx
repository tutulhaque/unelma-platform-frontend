import React from "react";

const ServicesBanner = () => {
  return (
    <div className="bg-gradient-to-r h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center from-[#3780B2] to-[#008081] py-24 px-6 text-center text-white">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Explore our latest Services, carefully selected and crafted for
          quality.
        </p>
      </div>
    </div>
  );
};

export default ServicesBanner;
