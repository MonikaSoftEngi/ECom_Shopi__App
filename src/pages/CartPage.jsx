import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateCartQuantity, clearCart, setOrders } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  if (!product) return <p>Loading product...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleIncreaseQuantity = (item) => updateCartQuantity(item, 1);
  const handleDecreaseQuantity = (item) => updateCartQuantity(item, -1);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleCheckout = () => {
    if (cart.length === 0) return; // Prevent checkout if cart is empty

    setOrders((prevOrders) => [...prevOrders, ...cart]); // ✅ Store items in Orders
    clearCart(); // ✅ Clear cart after storing orders
    navigate("/Orders"); // ✅ Navigate after updating orders
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="product-card">
      <img 
        src={`https://via.placeholder.com/150?text=${encodeURIComponent(product.name)}`} 
        alt={product.name} 
      />
      <h3>{product.name}</h3>
      <p>${isNaN(parseFloat(product.price)) ? "0.00" : parseFloat(product.price).toFixed(2)}</p>
      <button onClick={handleAddToCart} className="add-btn">+</button>

      {/* ✅ Cart Drawer */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Cart</h2>
          <button onClick={handleCloseCart} className="close-cart">X</button>
        </div>

        <ul className="cart-list">
          {cart.map((item) => {
            const price = parseFloat(item.price) || 0;
            return (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>${price.toFixed(2)}</span>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cart-total">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>

        <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default ProductCard;
