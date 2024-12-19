import React, { useState, useContext, useEffect } from "react";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Profile from "../Profile";
import Address from "../Address";
import Order from "../Order";
function Profile1() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const toggleContent = (type) => {
    if (type === "profile") {
      setProfileOpen(!profileOpen);
    }
    if (type === "order") {
      setOrderOpen(!orderOpen);
    } else if (type === "address") {
      setAddressOpen(!addressOpen);
    }
  };

  return (
    <div className="description-box">
      <div className="prod-details">
        <h3>Profile Details</h3>
      </div>
      <div className="details-accordion">
        <div>
          <h3
            onClick={() => toggleContent("profile")}
            className="accordion-header"
          >
            Profile
            <ExpandMoreIcon
              className={`expand-icon ${profileOpen ? "expanded" : ""}`}
            />
          </h3>
          <Collapse in={profileOpen}>
            <div className="accordion-content">
              <Profile />
            </div>
          </Collapse>
        </div>

        <div>
          <h3
            onClick={() => toggleContent("address")}
            className="accordion-header"
          >
            Shipping Address
            <ExpandMoreIcon
              className={`expand-icon ${addressOpen ? "expanded" : ""}`}
            />
          </h3>
          <Collapse in={addressOpen}>
            <div className="accordion-content">
              <Address />
            </div>
          </Collapse>
        </div>
        <div>
          <h3
            onClick={() => toggleContent("order")}
            className="accordion-header"
          >
            Orders
            <ExpandMoreIcon
              className={`expand-icon ${orderOpen ? "expanded" : ""}`}
            />
          </h3>
          <Collapse in={orderOpen}>
            <div className="accordion-content">
              <Order />
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Profile1;
