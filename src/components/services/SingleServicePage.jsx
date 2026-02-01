import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleServicePage = ({ setIsOpen }) => {
  const { documentId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(
      "https://unelma-platform-backend.onrender.com/api/services?populate=*",
    )
      .then((res) => res.json())
      .then((json) => {
        const foundService = json.data.find(
          (item) => item.documentId === documentId,
        );
        setService(foundService);
      })
      .catch((err) => console.error("Failed to load service:", err));
  }, [documentId]);

  if (!service) {
    return <p className="p-10 text-center text-gray-500">Loading service...</p>;
  }

  const bannerImage = service.service_image?.url
    ? `https://unelma-platform-backend.onrender.com${service.service_image.url}`
    : "https://via.placeholder.com/1400x700";

  const renderRichText = (blocks) => {
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      switch (block.type) {
        case "heading":
          return (
            <h2
              key={index}
              className={`text-${
                block.level === 3 ? "xl" : "2xl"
              } font-bold text-gray-800 mt-10 mb-4`}
            >
              {block.children?.[0]?.text}
            </h2>
          );
        case "paragraph":
          if (!block.children?.[0]?.text) return null;
          return (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">
              {block.children[0].text}
            </p>
          );
        case "list":
          return (
            <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
              {block.children.map((item, i) => (
                <li key={i} className="text-gray-600">
                  {item.children?.[0]?.text}
                </li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[460px] flex items-center justify-center">
        <img
          src={bannerImage}
          alt={service.service_title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {service.service_title} Services
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We build fast, secure, and scalable web solutions that help
            businesses grow and stand out.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* ===== SERVICE LEFT TEXT + RIGHT IMAGE ===== */}
          {service.service_left_text && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {renderRichText(service.service_left_text)}

                {/* ✅ Linked to global Quote modal */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-[#3780B2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a6c97] transition mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Request a Quote
                </button>
              </div>

              <img
                src={
                  service.service_right_image?.url
                    ? `https://unelma-platform-backend.onrender.com${service.service_right_image.url}`
                    : "https://via.placeholder.com/600x420"
                }
                alt="Service Visual"
                className="rounded-2xl shadow-lg object-cover w-full h-[420px]"
              />
            </div>
          )}

          {/* ===== RICH TEXT FIELD ===== */}
          {service.service_long_details && (
            <div className="bg-white rounded-2xl shadow-xl p-10">
              {renderRichText(service.service_long_details)}
            </div>
          )}

          {/* ===== FEATURES ===== */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Technology",
                desc: "Latest frameworks for speed and scalability.",
              },
              {
                title: "Business Focused",
                desc: "Designed to convert visitors into customers.",
              },
              {
                title: "Ongoing Support",
                desc: "Maintenance, updates, and optimization.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleServicePage;
