import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Orders = () => {
  const { orders } = useContext(AppContext); // ✅ Use `orders` instead of `cart`

  return (
    <div>
      {orders.length === 0 ? (
        <div className="container">
          <div className="center-content">
            <h1>My Orders</h1>
            <p>Nothing yet, add some produicts and check them out :)</p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="center-content">
            <h1>My Orders</h1>

              {orders.map((item, index) => (
                <div style={{ display: "flex", justifyContent: "center",padding:20}}>
                  <img
                    src={item.images || "https://via.placeholder.com/150"}
                    alt={item.images || "images"}
                    className="profile-image"
                  />
                  <div style={{ display: "grid", justifyContent: "center" }}>
                    <p key={index}> name: {item.title}</p>
                    <p key={index}> price: ${item.price} </p>
                    <p key={index}>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
