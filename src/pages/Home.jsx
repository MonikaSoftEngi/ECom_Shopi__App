import React, { useContext, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { category, setCategory } = useContext(AppContext); // ✅ Get category from context
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <div className="center-content">
        <h2>Home</h2>
        <SearchBar setSearch={setSearch} />
      </div>
      {/* ✅ Pass category and setCategory correctly */}
      <ProductList category={category} setCategory={setCategory} search={search} />
    </div>
  );
};

export default Home;
