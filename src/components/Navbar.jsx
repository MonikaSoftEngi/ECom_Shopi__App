import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Cart from "./Cart";

const Navbar = () => {
  const { cart, categories, setCategory, category, user } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Categories in Navbar:", categories); // ✅ Debug categories
  }, [categories]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <button
            onClick={() => {
              setCategory("All");
              navigate("/");
            }}
            className="home-btn"
          >
            Shopi
          </button>
        </div>

        <div className="-buttons">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.name);
                  navigate("/");
                }}
                className={`category-btn ${cat.name === category ? "active" : ""}`}
              >
                {cat.name}
              </button>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>

        <div className="nav-links">
          <p>{user?.email || "Aditi28@gmail.com"}</p>
          <Link to="/orders">My Orders</Link>
          <Link to="/profile">My Account</Link>
          <button onClick={() => setIsCartOpen(true)} className="cart-btn">
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
