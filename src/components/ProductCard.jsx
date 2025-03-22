import React, { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import Cart from "./Cart";

const ProductCard = ({ product = {} }) => {
  const { addToCart } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Log only when product changes
  useEffect(() => {
    // console.log("Product Data:", product);
  }, [product]);

  // ✅ Prevent re-creation of function on re-renders
  const handleAddToCart = useCallback(() => {
    addToCart(product);
    setIsCartOpen(true);
    setIsModalOpen(false);
  }, [addToCart, product]);

  if (!product.id) return <p className="loading-message">Loading product...</p>;

  return (
    <>
      {/* Product Card */}
      <div className="product-card" onClick={() => setIsModalOpen(true)}>
        <div className="product-image-container">
          <img
            src={product?.images?.[0] || "fallback-image-url"}
            alt={product?.title || "Product Image"}
            className="product-image"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="add-btn top-right-btn"
            aria-label="Add to Cart"
          >
            +
          </button>
          <p className="category-label">
            {product?.category?.name || "Uncategorized"}
          </p>
        </div>

        {/* Product Details */}
        <div>
          <p className="product-title">{product?.title || "Unnamed Product"}</p>
          <p className="product-price">
            ${isNaN(parseFloat(product.price)) ? "0.00" : parseFloat(product.price).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Product Detail Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4 className="modal-title">Details</h4>
            <button className="close-modal" onClick={() => setIsModalOpen(false)} aria-label="Close Modal">
              ×
            </button>

            <img
              src={product?.images?.[0] || "fallback-image-url"}
              alt={product?.title || "Product Image"}
              className="modal-image"
            />

            <h4 className="modal-price">
              ${isNaN(parseFloat(product.price)) ? "0.00" : parseFloat(product.price).toFixed(2)}
            </h4>
            <h4 className="modal-product-title">{product.title}</h4>
            <p className="modal-description">{product?.description || "No description available."}</p>

            <button onClick={handleAddToCart} className="add-btn">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
