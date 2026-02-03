import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { CreditCard, Truck } from "lucide-react";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Cash on Delivery order
  const placeCODOrder = async () => {
    if (
      !form.customer_name ||
      !form.customer_email ||
      !form.customer_phone ||
      !form.customer_address
    ) {
      alert("Please fill in all billing details.");
      return;
    }

    setLoading(true);

    try {
      const formattedCart = cart.map((item) => {
        const qty = item.quantity || 1;
        return {
          product_id: item.id,
          product_name: item.product_name,
          price: item.price,
          quantity: qty,
          subtotal: item.price * qty,
        };
      });

      const orderBody = {
        data: {
          ...form,
          cart_items: formattedCart,
          total_amount: formattedCart.reduce(
            (sum, item) => sum + item.subtotal,
            0,
          ),
          order_status: "pending",
          payment_method: "Cash on Delivery",
        },
      };

      const response = await fetch(
        "https://unelma-platform-backend.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderBody),
        },
      );

      if (!response.ok) throw new Error("Failed to place order");

      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong! Check console.");
    }

    setLoading(false);
  };

  // Stripe payment
  const handleStripeCheckout = async () => {
    if (
      !form.customer_name ||
      !form.customer_email ||
      !form.customer_phone ||
      !form.customer_address
    ) {
      alert("Please fill in all billing details for Stripe checkout.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://unelma-platform-backend.onrender.com/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart,
            customer_name: form.customer_name,
            customer_email: form.customer_email,
            customer_phone: form.customer_phone,
            customer_address: form.customer_address,
          }),
        },
      );

      const { url } = await response.json();

      if (!url) throw new Error("No session URL returned from backend");

      // 🔹 Redirect user to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert("Stripe checkout failed! Check console.");
    }

    setLoading(false);
  };

  if (orderPlaced)
    return (
      <h2 className="p-5 text-2xl text-green-600">
        Order placed successfully! We will contact you soon.
      </h2>
    );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  return (
    <div className="p-5 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Billing */}
      <div className="border p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="customer_name"
            placeholder="Full Name"
            value={form.customer_name}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="email"
            name="customer_email"
            placeholder="Email"
            value={form.customer_email}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="text"
            name="customer_phone"
            placeholder="Phone"
            value={form.customer_phone}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          <textarea
            name="customer_address"
            placeholder="Full Address"
            value={form.customer_address}
            onChange={handleChange}
            className="border p-3 rounded w-full md:col-span-2"
            rows="3"
            required
          ></textarea>
        </div>
      </div>

      {/* Summary */}
      <div className="border p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2 text-lg"
          >
            <span>
              {item.product_name} (x{item.quantity || 1})
            </span>
            <span>€{(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Total:</span>
          <span>€{cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        {/* Cash on Delivery Button */}
        <button
          onClick={placeCODOrder}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold text-white
bg-gradient-to-r from-[#3780B2] to-[#00A8A0]
hover:from-[#2F6C99] hover:to-[#008080]
transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Truck size={20} />
          {loading ? "Placing Order..." : "Place Order (COD)"}
        </button>

        {/* Stripe Payment Button */}
        <button
          onClick={handleStripeCheckout}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-[#000acc] to-[#1b5bf3] hover:from-[#0077AA] hover:to-[#005F66] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          <CreditCard size={20} />
          {loading ? "Redirecting..." : "Pay with Card"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
