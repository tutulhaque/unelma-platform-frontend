import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactSection = ({ title, contacts_color_title, description }) => {
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

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-[#FFF9F7] to-[#F0FFFC]">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          {title}{" "}
          <span className="text-transparent bg-clip-text bg-[#3780B2]">
            {contacts_color_title}
          </span>
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md shadow-lg rounded-2xl p-8 md:p-10 border border-white/40"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[#3780B2]"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullName"
              className="absolute left-0 -top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#3780B2]"
            >
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[#3780B2]"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#3780B2]"
            >
              Email
            </label>
          </div>

          {/* Phone */}
          <div className="relative md:col-span-2">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[#3780B2]"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute left-0 -top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#3780B2]"
            >
              Phone
            </label>
          </div>

          {/* Message */}
          <div className="relative md:col-span-2">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[#3780B2]"
              placeholder=" "
              required
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-0 -top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#3780B2]"
            >
              Message
            </label>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-[#3780B2] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg flex items-center gap-2 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}{" "}
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Status Messages */}
        {success && (
          <p className="text-green-600 text-center mt-4">
            ✅ Message sent successfully!
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-4">
            ❌ Failed to send message. Try again later.
          </p>
        )}
      </motion.form>
    </section>
  );
};

export default ContactSection;
