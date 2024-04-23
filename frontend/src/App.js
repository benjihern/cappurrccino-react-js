// CURRENT IMPLEMENTATION OF SWITCHING FROM LOGIN SCREEN TO MENU

import HeaderMenu from "./pages/Menu/components/Header/Header";

import Loading from "./components/Loading/Loading";
import {useLoading} from './Hooks/useLoading';
import {setLoadingInterceptor} from './interceptors/loadingInterceptor';
import {useEffect} from 'react';

import AppRoutes from "./AppRoutes";

function App() {
  const {showLoading, hideLoading} = useLoading();

  useEffect(() => {
    setLoadingInterceptor({showLoading, hideLoading});
  });

  return (
    <>
      <Loading />
      <HeaderMenu />
      <AppRoutes />
    </>
  )

  // var currentUser = Login.userLoggedIn;
  // const routesArray = [
  //   {
  //     path: "*",
  //     element: currentUser ? <><HeaderLogin /><Login /></> : <><Loading /><HeaderMenu /><MenuPage /></>,
  //   },
  //   {
  //     path: "/login",
  //     element: <><HeaderLogin /><Login /></>,
  //   },
  //   {
  //     path: "/register",
  //     element: <><HeaderLogin /><Register /></>,
  //   },
  //   {
  //     path: "/menu",
  //     element: <><HeaderMenu /><MenuPage /></>,
  //   },
  //   {
  //     path: "/search/:searchTerm",
  //     element: <><HeaderMenu /><MenuPage /></>,
  //   },
  //   {
  //     path: "/tag/:tag",
  //     element: <><HeaderMenu /><MenuPage /></>,
  //   },
  //   {
  //     path: "/food/:id",
  //     element: <><HeaderMenu /><FoodPage /></>,
  //   },
  //   {
  //     path: "/cart",
  //     element: <><HeaderMenu /><CartPage /></>,
  //   },
  // ];
  // let routesElement = useRoutes(routesArray);
  // return (
  //   <AuthProvider>
  //    {/*The loading screen is kinda trippy because the page loads quickly, it can be added/removed through this line */}
  //     <Loading />
  //     <div className="w-full h-screen flex flex-col">{routesElement}</div>
  //   </AuthProvider>
  // );
}
export default App;
