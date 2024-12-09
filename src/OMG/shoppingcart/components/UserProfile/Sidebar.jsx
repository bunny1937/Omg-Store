import React from "react";
import "./Sidebar.css";

function Sidebar({ active, onChange }) {
  const menuItems = [
    "Profile",
    "Order",
    "Favourites",
    "Address",
    "ReturnRefund",
    "TermsCo",
    "ContactUs",
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <button
          key={item}
          className="menu-item "
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
