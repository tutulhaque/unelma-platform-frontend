import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // clear cart after successful payment
  }, [clearCart]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#E0F7FA] to-[#F1F8E9] px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center animate-fadeIn">
        {/* Success Icon */}
        <CheckCircle className="mx-auto text-[#00BFA6] w-20 h-20 mb-6" />

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for your order. <br />
          Your payment has been processed successfully and your order is now
          confirmed.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
