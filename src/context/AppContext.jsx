import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";

export const AppContext = createContext();

const API_URLS = {
  categories: "https://api.escuelajs.co/api/v1/categories",
  products: "https://api.escuelajs.co/api/v1/products",
  users: "https://api.escuelajs.co/api/v1/users",
};

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  console.log("Current User:", user);

  useEffect(() => {
    const fetchData = async (url, setter, name) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${name}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
      }
    };

    fetchData(API_URLS.products, setProducts, "Products");
    fetchData(API_URLS.categories, setCategories, "Categories");
    fetchData(API_URLS.users, (data) => {
      setUsers(data);
      if (data.length > 0) {
        setUser(data[0]); // Set the first user as the default user
        localStorage.setItem("user", JSON.stringify(data[0])); // Persist user
      }
    }, "Users");
  }, []);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // ✅ Memoized Add to Cart
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  // ✅ Memoized Update Cart Quantity
  const updateCartQuantity = useCallback((productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  }, []);

  // ✅ Clear cart after checkout
  const clearCart = useCallback(() => {
    console.log("Cart cleared");
    setCart([]);
  }, []);

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // ✅ Memoized Context Value
  const value = useMemo(
    () => ({
      products,
      categories,
      users,
      category,
      setCategory,
      cart,
      setCart,
      orders,
      setOrders,
      user,
      setUser,
      addToCart,
      updateCartQuantity,
      clearCart,
      removeFromCart,
    }),
    [products, categories, users, category, cart, orders, user, addToCart, updateCartQuantity, removeFromCart, clearCart]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
