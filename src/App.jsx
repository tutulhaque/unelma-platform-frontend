import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import SingleBlog from "./pages/SingleBlog";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Services from "./pages/Services";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import SingleServicePage from "./components/services/SingleServicePage";
import QuoteFormModal from "./components/services/QuoteFormModal";

import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  // ✅ Global Quote Modal state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        {/* ✅ Global Quote Modal */}
        <QuoteFormModal isOpen={isQuoteOpen} setIsOpen={setIsQuoteOpen} />

        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />

            {/* ✅ Services Pages */}
            <Route
              path="/services"
              element={<Services setIsOpen={setIsQuoteOpen} />}
            />
            <Route
              path="/services/:documentId"
              element={<SingleServicePage setIsOpen={setIsQuoteOpen} />}
            />

            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:documentId" element={<SingleBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
          </Routes>
        </Layout>

        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </CartProvider>
  );
}

export default App;
