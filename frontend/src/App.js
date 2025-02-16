import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useConfig } from "./context/ConfigContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import FileExplorer from "./components/FileExplorer";
import Account from "./components/Account";
import PreviewPage from "./components/PreviewPage";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Search from "./components/Search";

const ProtectedRoute = ({ children, requireAuth }) => {
  const { token } = useSelector((state) => state.auth);
  return requireAuth && !token ? <Navigate to="/login" /> : children;
};

function App() {
  const config = useConfig();

  if (!config) return <div>Loading configuration...</div>;

  const security = config.security || {};

  return (
    <Router>
      <div style={{ paddingBottom: "50px" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProtectedRoute requireAuth={true}><Account /></ProtectedRoute>} />

          <Route path="/explorer" element={
            <ProtectedRoute requireAuth={security.explorer}>
              <FileExplorer />
            </ProtectedRoute>
          } />

          <Route path="/preview" element={
            <ProtectedRoute requireAuth={security.preview}>
              <PreviewPage />
            </ProtectedRoute>
          } />

          <Route path="/search" element={
            <ProtectedRoute requireAuth={security.search}>
              <Search />
            </ProtectedRoute>
          } />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
