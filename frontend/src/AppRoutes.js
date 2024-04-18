import React from "react";
import { Route, Routes } from "react-router-dom";

import MenuPage from "./pages/Menu/MenuPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import FoodPage from "./pages/Food/FoodPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import AuthRoute from "./components/Loading/AuthRoute.js/AuthRoute";
import PaymentPage from "./pages/Payment/PaymentPage";
import RegisterPage from "./pages/Register/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<><MenuPage /></>} />
      <Route path="/login" element={<><LoginPage /></>} />
      <Route path="/register" element={<><RegisterPage /></>} />
      <Route path="/menu" element={<><MenuPage /></>} />
      <Route path="/search/:searchTerm" element={<><MenuPage /></>} />
      <Route path="/tag/:tag" element={<><MenuPage /></>} />
      <Route path="/food/:id" element={<><FoodPage /></>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      <Route path="/payment" element={<PaymentPage/>} />
    </Routes>
  );
}
