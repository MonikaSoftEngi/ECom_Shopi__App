

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProfilePage = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <div className="container">
        <h2>My Account</h2>
        <p>User data not available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="container">My Account</h2>
      <div className="profile-card">
        <p className="profile-label">Created by:  <a href={`https://github.com/ADITIHINGE?tab=repositories/${user.username}`} target="_blank" rel="noopener noreferrer">
            @{'Aditi'} <span>👉</span>
          </a></p>
        <p className="profile-username">
         
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt={user.name || "User Avatar"}
          className="profile-image"
        />
        <h3 className="profile-name">{user.name || "No Name Provided"}</h3>
       <p>Email: {user.email || "No Email Provided"}</p>

       
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
