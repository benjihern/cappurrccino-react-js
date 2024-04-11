import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/components/auth/login/login";
import Register from "./pages/Login/components/auth/register/register";
import MenuPage from "./pages/Menu/MenuPage";

import HeaderLogin from "./pages/Login/components/header/header";
import HeaderMenu from "./pages/Menu/components/Header/Header";
import CartPage from "./pages/Cart/CartPage";
//import Register from "./pages/Login/components/auth/register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<><HeaderMenu /><MenuPage /></>} />
      {/* <Route path="/login" element={<><HeaderLogin /><Login /></>} />
      <Route path="/register" element={<><HeaderLogin /><Register /></>} /> */}
      <Route path="/menu" element={<><HeaderMenu /><MenuPage /></>} />
      <Route path="/search/:searchTerm" element={<><HeaderMenu /><MenuPage /></>} />
      <Route path="/tag/:tag" element={<><HeaderMenu /><MenuPage /></>} />
      <Route path="/cart" element={<CartPage/>} />
    </Routes>
  );
}
