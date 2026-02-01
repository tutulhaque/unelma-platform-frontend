import React from "react";
import ProductBanner from "../components/product/ProductBanner";
import ProductCard from "../components/product/ProductCard";

const Product = () => {
  return (
    <div>
      <ProductBanner />
      <section className="py-20 px-4 md:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard />
        </div>
      </section>
    </div>
  );
};

export default Product;
