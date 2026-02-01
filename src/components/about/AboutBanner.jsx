import React from "react";

const AboutBanner = ({ title, backgroundImage }) => {
  return (
    <section
      className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3780B2cc] via-[#008081cc] to-black/60"></div>

      {/* Decorative Blur (for depth) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] blur-3xl opacity-50 bg-gradient-to-t from-[#008081] to-transparent"></div>

      {/* Title */}
      <h1 className="relative text-3xl md:text-5xl font-bold z-10 drop-shadow-lg">
        {title}
      </h1>
    </section>
  );
};

export default AboutBanner;
