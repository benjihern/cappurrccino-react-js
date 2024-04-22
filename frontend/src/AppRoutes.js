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
import ProfilePage from "./pages/Profile/ProfilePage";
import OrderTrackPage from "./pages/OrderTrack/OrderTrackPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import FoodsAdminPage from "./pages/FoodsAdmin/FoodsAdminPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserEditPage from "./pages/UserEdit/UserEditPage";
import FoodEditPage from "./pages/FoodEdit/FoodEditPage";

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
      <Route path="/checkout" element={<AuthRoute><CheckoutPage/></AuthRoute>} />
      <Route path="/payment" element={<AuthRoute><PaymentPage/></AuthRoute>} />
      <Route path="/profile" element={<AuthRoute><ProfilePage/></AuthRoute>} />
      <Route path="/track/:orderId" element={<AuthRoute><OrderTrackPage/></AuthRoute>} />
      <Route path="/orders/:filter?" element={<AuthRoute><OrdersPage/></AuthRoute>} />
      <Route path="/dashboard" element={<AuthRoute><Dashboard/></AuthRoute>} />
      <Route path="/admin/foods/:searchTerm?" element={<AdminRoute><FoodsAdminPage/></AdminRoute>} />
      <Route path="/admin/users/:searchTerm?" element={<AdminRoute><UsersPage/></AdminRoute>} />
      <Route path="/admin/editUser/:userId?" element={<AdminRoute><UserEditPage/></AdminRoute>} />
      <Route path="/admin/addFood" element={<AdminRoute><FoodEditPage/></AdminRoute>} />
      <Route path="/admin/editFood/:foodId" element={<AdminRoute><FoodEditPage/></AdminRoute>} />
    </Routes>
  );
}
