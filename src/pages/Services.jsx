import React, { useEffect, useState } from "react";
import ServicesSection from "../components/services/ServicesSection";
import ServicesBanner from "../components/services/ServicesBanner";

const Services = ({ setIsOpen }) => {
  const [services, setServices] = useState([]);

  // Fetch services data from API
  useEffect(() => {
    fetch(
      "https://unelma-platform-backend.onrender.com/api/services?populate=*",
    )
      .then((res) => res.json())
      .then((json) => {
        setServices(json.data);
      })
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  // Function to get image URL from the service data
  const getImageUrl = (service) => {
    const img = service.service_image;
    if (!img) return "https://via.placeholder.com/600x400";
    if (img.url)
      return `https://unelma-platform-backend.onrender.com${img.url}`;
    return "https://via.placeholder.com/600x400";
  };

  return (
    <>
      <ServicesBanner />

      <div className="container mx-auto px-4 py-12">
        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServicesSection
              key={service.id}
              service={service}
              image={getImageUrl(service)}
              setIsOpen={setIsOpen} // ✅ open global modal
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
