// CURRENT IMPLEMENTATION OF SWITCHING FROM LOGIN SCREEN TO MENU

import MenuPage from "./pages/Menu/MenuPage";

import Login from "./pages/Login/components/auth/login/login";
import Register from "./pages/Login/components/auth/register/register";

import HeaderLogin from "./pages/Login/components/header/header";
import HeaderMenu from "./pages/Menu/components/Header/Header";

import Loading from "./components/Loading/Loading";
import {useLoading} from './Hooks/useLoading';
import {setLoadingInterceptor} from './interceptors/loadingInterceptor';
import {useEffect} from 'react';

import { AuthProvider } from "./pages/Login/contexts/authContext/";
import { useRoutes } from "react-router-dom";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";

function App() {
  const {showLoading, hideLoading} = useLoading();

  useEffect(() => {
    setLoadingInterceptor({showLoading, hideLoading});
  });

  var currentUser = Login.userLoggedIn;
  const routesArray = [
    {
      path: "*",
      element: currentUser ? <><Loading /><HeaderLogin /><Login /></> : <><Loading /><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/login",
      element: <><Loading /><HeaderLogin /><Login /></>,
    },
    {
      path: "/register",
      element: <><Loading /><HeaderLogin /><Register /></>,
    },
    {
      path: "/menu",
      element: <><Loading /><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/search/:searchTerm",
      element: <><Loading /><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/tag/:tag",
      element: <><Loading /><HeaderMenu /><MenuPage /></>,
    },
    {
      path: "/food/:id",
      element: <><Loading /><HeaderMenu /><FoodPage /></>,
    },
    {
      path: "/cart",
      element: <><Loading /><HeaderMenu /><CartPage /></>,
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
