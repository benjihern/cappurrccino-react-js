// CODE FOR SWITCHING FROM LOGIN SCREEN TO MENU

// import React from "react";
// import { AuthProvider, useAuth } from "./pages/Login/contexts/authContext/index";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login/components/auth/login/login";
// import Register from "./pages/Login/components/auth/register/register";
// import Header from "./pages/Login/components/header/header";
// import Home from "./pages/Login/components/home/home";
// import MenuPage from "./pages/Menu/MenuPage";

// function App() {
//   const { currentUser } = useAuth();

//   return (
//     <AuthProvider>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route
//           path="/login"
//           element={currentUser ? <Navigate to="/menu" /> : <Login />}
//         />
//         <Route path="/register" element={<Register />} />
//         <Route path="/home" element={<Home />} />
//         <Route
//           path="/menu"
//           element={currentUser ? <MenuPage /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </AuthProvider>
//   );
// }
// export default App;

// CURRENT IMPLEMENTATION OF SWITCHING FROM LOGIN SCREEN TO MENU

import MenuPage from "./pages/Menu/MenuPage";

import Login from "./pages/Login/components/auth/login/login";
import Register from "./pages/Login/components/auth/register/register";

import HeaderLogin from "./pages/Login/components/header/header";
import HeaderMenu from "./pages/Menu/components/Header/Header";

import { AuthProvider } from "./pages/Login/contexts/authContext/";
import { useRoutes } from "react-router-dom";

function App() {
  var currentUser = Login.userLoggedIn;
  const routesArray = [
    {
      path: "*",
      element: currentUser ? <><HeaderLogin /><Login /></> : <><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/login",
      element: <><HeaderLogin /><Login /></>,
    },
    {
      path: "/register",
      element: <><HeaderLogin /><Register /></>,
    },
    {
      path: "/menu",
      element: <><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/search/:searchTerm",
      element: <><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/tag/:tag",
      element: <><HeaderMenu /><MenuPage /></>,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}
export default App;



// CODE FOR OPENING UP MENU ON STARTUP

// import AppRoutes from "./AppRoutes";
// // import Header from "./pages/Menu/components/Header/Header";

// function App() {
//   return (
//     <>
//       <AppRoutes />
//     </>
//   );
// }

// export default App;