import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">
        Thank you for your order. We have received your payment and your order
        is being processed.
      </p>
      <Link
        to="/"
        className="bg-[#3780B2] text-white px-6 py-3 rounded-lg hover:bg-[#2b6d97] transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
