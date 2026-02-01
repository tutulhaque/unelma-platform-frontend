import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const cartTotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-3">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some items to continue shopping.</p>
        <button className="mt-5 w-36 bg-[#3780B2] text-white py-2 rounded-lg font-medium hover:bg-[#2b6d97] transition">
          <a href="http://localhost:5173/product">Back to product</a>
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto md:p-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border">
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">{item.product_name}</span>
                  </td>
                  <td className="text-center p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center p-4 font-semibold">
                    €{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </td>
                  <td className="text-center p-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={clearCart}
            className="mt-5 bg-gradient-to-r from-[#3780B2] to-[#008081] text-white px-6 py-2 rounded hover:bg-gradient-to-l from-[#2a6c97] to-[#008081] hover:shadow-xl"
          >
            Clear Cart
          </button>
        </div>

        <div className="border rounded-xl p-6 shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
          <div className="flex justify-between py-2 border-b">
            <span className="text-lg font-medium">Items:</span>
            <span className="text-lg">
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b font-semibold text-lg">
            <span>Subtotal:</span>
            <span>€{cartTotal.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="bg-gradient-to-r from-[#3780B2] to-[#008081] text-white w-full block text-center py-3 rounded-lg text-lg font-semibold hover:bg-gradient-to-l from-[#2a6c97] to-[#008081] transition"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
