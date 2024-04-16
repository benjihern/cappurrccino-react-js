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
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import AuthRoute from "./components/Loading/AuthRoute.js/AuthRoute";

function App() {
  const {showLoading, hideLoading} = useLoading();

  useEffect(() => {
    setLoadingInterceptor({showLoading, hideLoading});
  });

  var currentUser = Login.userLoggedIn;
  const routesArray = [
    {
      path: "*",
      element: currentUser ? <><HeaderLogin /><Login /></> : <><Loading /><HeaderMenu /><MenuPage /></>,
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
    {
      path: "/food/:id",
      element: <><HeaderMenu /><FoodPage /></>,
    },
    {
      path: "/cart",
      element: <><HeaderMenu /><CartPage /></>,
    },
    {
      path: "/checkout",
      element: <AuthRoute><HeaderMenu /><CheckoutPage/></AuthRoute>,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
     {/*The loading screen is kinda trippy because the page loads quickly, it can be added/removed through this line */}
      <Loading />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}
export default App;
