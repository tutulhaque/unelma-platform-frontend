import React from "react";
import { motion } from "framer-motion";

const AboutCompany = ({
  image,
  heading,
  who_we_are_color_title,
  text,
  reverse,
}) => {
  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden">
      <div
        className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? "md:flex-row-reverse" : ""}`}
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-2/4 w-full" // image height
        >
          <div className="relative group">
            <img
              src={image}
              alt={heading}
              className="rounded-3xl shadow-lg w-full object-cover h-[400px] md:h-[400px] transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FF8A73]/20 to-[#008081]/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-2/5 w-full text-center md:text-left" // little smaller than image
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r text-gray-800 bg-clip-text">
            {heading}
            <span className="text-[#3780B2]"> {who_we_are_color_title}</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{text}</p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#3780B2] to-[#008081] text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCompany;
