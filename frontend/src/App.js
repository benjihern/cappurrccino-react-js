import Login from "./pages/Login/components/auth/login/login";
import Register from "./pages/Login/components/auth/register/register";

import Header from "./pages/Login/components/header/header";
import Home from "./pages/Login/components/home/home";

import { AuthProvider } from "./pages/Login/contexts/authContext/";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;