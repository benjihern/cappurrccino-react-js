import React from "react";
import { AuthProvider, useAuth } from "./pages/Login/contexts/authContext/";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "./pages/Login/components/auth/login/login";
import Register from "./pages/Login/components/auth/register/register";
import Header from "./pages/Login/components/header/header";
import Home from "./pages/Login/components/home/home";
import MenuPage from "./pages/Menu/MenuPage";

function App() {
  const { currentUser } = useAuth();

  const routesArray = [
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: currentUser ? <Navigate to="/menu" /> : <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/menu",
      element: currentUser ? <MenuPage /> : <Navigate to="/login" />,
    },
  ];

  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;