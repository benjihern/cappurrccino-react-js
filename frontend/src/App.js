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
