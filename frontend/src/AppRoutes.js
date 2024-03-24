import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/Menu/MenuPage";
import Login from "./pages/Login/components/auth/login/login";
// import Login from "./pages/Login/components/auth/login";
// import Register from "./pages/Login/components/auth/register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<MenuPage />} />
    </Routes>
  );
}
