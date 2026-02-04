import React from "react";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

const Services = ({
  services_title,
  service_color_title,
  services_description,
  services_image,
  HomeServices,
}) => {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#F9FAFB] to-[#EAF4F4]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14">
        {/* Left Column */}
        <div className="lg:w-[45%] lg:sticky lg:top-24 self-start space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {services_title}{" "}
            <span className="text-[#3780B2]">{service_color_title}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {services_description}
          </p>

          {/* Decorative Image */}
          {services_image && (
            <div className="relative mt-10">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FF8A73] to-[#008081] blur-2xl opacity-20 rounded-2xl"></div>
              <img
                src={`https://unelma-platform-backend.onrender.com${services_image.url}`}
                alt={services_image.alternativeText || "Service Image"}
                className="rounded-2xl shadow-lg relative z-10 w-full"
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:w-[55%] flex flex-col gap-8">
          {HomeServices.map((service) => {
            const Icon = Icons[service.lucide_icon]; // Get icon dynamically
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#008081] to-[#3780B2] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    {Icon ? <Icon className="w-8 h-8 text-white" /> : null}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    <a href={service.button_link}>{service.title}</a>
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-[#008081] font-semibold">
                  <button>
                    <a href={service.button_link}>{service.button_text}</a>
                  </button>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
