import React from "react";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  if (!isAdmin) {
    return <h2>Access Denied. Admins Only.</h2>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, Admin! You have special privileges.</p>
    </div>
  );
};

export default AdminPanel;
