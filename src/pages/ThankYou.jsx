import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // redirect to home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#E0F7FA] to-[#F1F8E9] px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center animate-fadeIn">
        <CheckCircle className="mx-auto text-[#3780B2] w-16 h-16 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Thank You for Subscribing!
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We need to confirm your email address. <br />
          To complete the subscription process, please click the link in the
          email we just sent you. You may also need to check your junk or spam
          folder.
        </p>
        <button
          onClick={goHome}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-[#3780B2] to-[#00BFA6] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
