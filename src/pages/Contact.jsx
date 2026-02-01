import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const API_URL = "https://unelma-platform-backend.onrender.com";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const res = await fetch(`${API_URL}/api/contact-forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData, // ✅ Strapi v4 expects { data: {...} }
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    const Contacts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contact?populate=*`);
        const data = await res.json();
        setContacts(data.data || []);
      } catch (error) {
        console.error("Error fetching Contact Page Content:", error);
      }
    };
    Contacts();
  }, []);
  console.log();
  const backgroundImage =
    "https://images.unsplash.com/photo-1503264116251-35a269479413";

  return (
    <div className="w-full">
      {/* Banner Section */}
      <section
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center text-white relative overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#3780B2cc] via-[#008081cc] to-black/60"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] blur-3xl opacity-50 bg-gradient-to-t from-[#008081] to-transparent"></div>
        <h1 className="relative text-3xl md:text-5xl font-bold z-10 drop-shadow-lg">
          {contacts?.contact_banner_title}
        </h1>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Info */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {contacts?.contact_title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {contacts?.contact_description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-[#3780B2]" />
                <p className="text-gray-700">{contacts?.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-[#3780B2]" />
                <p className="text-gray-700">{contacts?.phone}</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-[#3780B2]" />
                <p className="text-gray-700">{contacts?.email}</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3780B2]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3780B2]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+358..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3780B2]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="4"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3780B2]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#3780B2] to-[#008081] text-white py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-green-600 mt-3 text-center">
                  ✅ Message sent successfully!
                </p>
              )}
              {error && (
                <p className="text-red-600 mt-3 text-center">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
