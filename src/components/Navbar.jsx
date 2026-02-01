// Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [global, setGlobal] = useState(null);

  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  /* ---------------- FETCH LOGO ---------------- */
  useEffect(() => {
    fetch("https://unelma-platform-backend.onrender.com/api/global?populate=*")
      .then((res) => res.json())
      .then((data) => setGlobal(data?.data));
  }, []);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwt"));
  }, []);

  /* ---------------- FETCH NAV ---------------- */
  useEffect(() => {
    fetch("https://unelma-platform-backend.onrender.com/api/navigations")
      .then((res) => res.json())
      .then((json) => setNavItems(json.data.sort((a, b) => a.order - b.order)));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
    setAccountOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <NavLink to="/" className="flex-shrink-0">
            {global?.logo?.url && (
              <img
                src={`https://unelma-platform-backend.onrender.com${global.logo.url}`}
                alt="Logo"
                className="h-12"
              />
            )}
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-6 font-semibold text-lg">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.slug} className="hover:text-[#008081]">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 relative">
            {/* ACCOUNT */}
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="hidden md:flex items-center font-semibold text-lg"
            >
              My Account <Plus size={16} />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-10 bg-white border shadow rounded w-40">
                {!isLoggedIn ? (
                  <>
                    <NavLink className="block px-4 py-2" to="/login">
                      Login
                    </NavLink>
                    <NavLink className="block px-4 py-2" to="/register">
                      Register
                    </NavLink>
                  </>
                ) : (
                  <button
                    className="block w-full text-left px-4 py-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}

            {/* CART */}
            <NavLink to="/cart" className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 w-full bg-white z-40 shadow-md md:hidden">
          <ul className="flex flex-col p-4 space-y-4 font-semibold">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.slug} onClick={() => setMobileOpen(false)}>
                  {item.title}
                </NavLink>
              </li>
            ))}

            <hr />

            {!isLoggedIn ? (
              <>
                <NavLink to="/login" onClick={() => setMobileOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setMobileOpen(false)}>
                  Register
                </NavLink>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </ul>
        </div>
      )}

      {/* SPACER */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;
