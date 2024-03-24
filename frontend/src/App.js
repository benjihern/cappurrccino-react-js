import React from "react";
import { AuthProvider, useAuth } from "./pages/Login/contexts/authContext/";
import { useRoutes, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/components/auth/login/login";
import Register from "./pages/Login/components/auth/register/register";
import Header from "./pages/Login/components/header/header";
import Home from "./pages/Login/components/home/home";
import MenuPage from "./pages/Menu/MenuPage";

function App() {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/menu" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/menu"
          element={currentUser ? <MenuPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;