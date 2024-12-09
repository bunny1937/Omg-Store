import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Order from "./Order";
import Favourites from "./Favourites";
import Address from "./Address";
import ReturnRefund from "./Return-Refund";
import TermsCo from "./Terms-Co";
import ContactUs from "./Contact-Us";
import "./UserProfile1.css";
import Profile from "./Profile";

function UserProfile1() {
  const [activeComponent, setActiveComponent] = useState("Profile");
  const isMobile = window.innerWidth < 760;

  // Render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "Profile":
        return <Profile />;
      case "Order":
        return <Order />;
      case "Favourites":
        return <Favourites />;
      case "Address":
        return <Address />;
      case "ReturnRefund":
        return <ReturnRefund />;
      case "TermsCo":
        return <TermsCo />;
      case "ContactUs":
        return <ContactUs />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="user-profile">
      {/* Breadcrumb */}
      {activeComponent && (
        <div className="breadcrumb">
          <span onClick={() => setActiveComponent(null)}>Home</span>
          <span>
            {">"} {activeComponent}
          </span>
        </div>
      )}

      {/* Sidebar */}
      {!activeComponent || !isMobile ? (
        <div className="sidebar-container">
          <Sidebar onChange={setActiveComponent} />
        </div>
      ) : null}

      {/* Content */}
      {activeComponent && (
        <div className="content-container">{renderComponent()}</div>
      )}
    </div>
  );
}

export default UserProfile1;
