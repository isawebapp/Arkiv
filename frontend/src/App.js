import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConfigProvider } from "./context/ConfigContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import FileExplorer from "./components/FileExplorer";
import Account from "./components/Account";
import PreviewPage from "./components/PreviewPage";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Search from "./components/Search";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ConfigProvider>
      <Router>
        <div style={{ paddingBottom: "50px" }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explorer/*" element={<FileExplorer />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
