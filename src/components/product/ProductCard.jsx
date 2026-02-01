import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import ProductDetailsModal from "../product/ProductDetailsModal";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://unelma-platform-backend.onrender.com/api/product?populate=*",
        );
        const json = await res.json();

        const cards = json?.data?.products_card || [];

        const formatted = cards.map((item) => ({
          id: item.id,
          product_name: item.product_title,
          price: item.product_price,
          product_details: item.product_details, // Rich text from Strapi
          image: item.product_image?.[0]
            ? `https://unelma-platform-backend.onrender.com${item.product_image[0].url}`
            : "",
        }));

        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const openDetails = (details) => {
    setSelectedDetails(details);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.product_name} added to cart!`);
    navigate("/cart"); // redirect to cart page
  };

  return (
    <>
      {products.length === 0 && <p>Loading products...</p>}

      {/* Product Cards */}
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col"
        >
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />

          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {product.product_name}
          </h3>

          <p className="text-lg font-medium text-gray-700 mb-4">
            €{product.price}
          </p>

          {/* Product Details Button */}
          <button
            onClick={() => openDetails(product.product_details)}
            className="w-full mb-2 border bg-gradient-to-r from-[#3780B2] to-[#008081] text-white py-2 rounded-lg font-medium hover:scale-105 transition-all font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            Product Details
          </button>

          {/* Add to Cart */}
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-[#3780B2] text-white py-2 rounded-lg font-medium hover:bg-[#2b6d97] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            Add to Cart
          </button>
        </div>
      ))}

      {/* Modal Component */}
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={selectedDetails}
      />
    </>
  );
};

export default ProductCard;
