import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        ❌ Payment Failed
      </h1>
      <p className="text-gray-700 mb-6">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <Link
        to="/cart"
        className="bg-[#3780B2] text-white px-6 py-3 rounded-lg hover:bg-[#2b6d97] transition"
      >
        Back to Cart
      </Link>
    </div>
  );
};

export default PaymentFailed;
