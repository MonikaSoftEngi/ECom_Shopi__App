import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Cart = ({ isOpen, onClose }) => {
  const { cart, updateCartQuantity, clearCart, setOrders, removeFromCart } =
    useContext(AppContext);
  const navigate = useNavigate();

  // Memoized total price calculation for performance
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0) * (item.quantity ?? 1),
      0
    );
  }, [cart]);

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrders((prevOrders) => [
      ...prevOrders,
      ...cart.map((item) => ({ ...item })),
    ]);
    clearCart();
    navigate("/orders");
  };

  // Prevent rendering if cart is closed
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">My Order</h2>
          <button
            onClick={onClose}
            className="close-cart"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <ul className="cart-list">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty. Start shopping!</p>
            </div>
          ) : (
            cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/60"}
                  alt={item.name || "Product image"}
                  className="cart-item-image"
                  width="60"
                  height="60"
                />

                <div className="cart-item-details">
                  <p>{item.title}</p>
                  <h4 style={{textAlign:'left',paddingLeft:'7%'}}>${parseFloat(item.price || 0).toFixed(2)}</h4>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateCartQuantity(item.id, item.quantity - 1);
                      }}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                      disabled={item.quantity === 1} // Prevent going below 1
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateCartQuantity(item.id, item.quantity + 1);
                      }}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Item */}
                <button
                  className="remove-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(item.id); // ✅ Use the function
                  }}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span> <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button
            onClick={handleCheckout}
            className="checkout-btn"
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
