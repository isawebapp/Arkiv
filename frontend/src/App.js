import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import FileExplorer from "./components/FileExplorer";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import Account from "./components/Account";
import PreviewPage from "./components/PreviewPage";
import Footer from "./components/Footer";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  return isAdmin ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: "50px" }}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/*" element={<FileExplorer />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
