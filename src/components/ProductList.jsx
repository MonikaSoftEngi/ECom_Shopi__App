import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppContext";

const ProductList = ({ category, search }) => {
  const { products = [] } = useContext(AppContext);

  if (!Array.isArray(products) || products.length === 0) {
    return <p className="error-message">No products available.</p>;
  }

  const filteredProducts = products.filter((product) => {
    const productCategory = product.category?.name || "Uncategorized";
    const productName = product.title?.toLowerCase() || ""; // ✅ Fix: Use `title` for filtering

    const matchesCategory = category === "All" || productCategory === category;
    const matchesSearch = search === "" || productName.includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="product-list-container">
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-products-message">Nothing related :(</p>
      )}
    </div>
  );
};

export default ProductList;
