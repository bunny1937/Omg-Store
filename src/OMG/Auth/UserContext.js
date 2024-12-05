import React, { createContext, useState, useEffect } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if a user is already logged in
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));

    if (storedUser) {
      setUser(storedUser);
      setIsAdmin(storedAdmin || false);
    }
  }, []);

  useEffect(() => {
    // Set session storage whenever user or isAdmin changes
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    } else {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isAdmin");
    }
  }, [user, isAdmin]);

  return (
    <UserContext.Provider value={{ user, isAdmin, setUser, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
