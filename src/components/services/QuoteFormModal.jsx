import React, { useState } from "react";
import toast from "react-hot-toast";

const QuoteFormModal = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      full_name: e.target.full_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      service_type: e.target.service_type.value,
      details: e.target.details.value,
    };

    try {
      const res = await fetch(
        "https://unelma-platform-backend.onrender.com/api/quote-submissions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: formData }),
        },
      );

      if (!res.ok) throw new Error("Failed to submit");

      toast.success("Your request has been submitted!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Get a Free Quote
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="full_name"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Service Type
            </label>
            <select
              name="service_type"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">Select a service...</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Security & Compliance">
                Security & Compliance
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Details</label>
            <textarea
              name="details"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3780B2] text-white py-3 rounded-lg font-semibold hover:bg-[#2a6c97] transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteFormModal;
