
import './App.css'
import Home from './pages/Home/Home';
import MainNavigation from './pages/MainNavigation/MainNavigation'
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';
import WareHouse from './pages/WareHouse/WareHouse';
import Ship from './pages/Ship/Ship';

function App() {
 
  const routers = createBrowserRouter([
    {
      path: "",
      element: <MainNavigation />,
      children: [
        { path: "/", element: <Home /> },
        {path: "/orders", element: <Orders /> },
        {path: "/products", element: <Products /> },
        {path: "/warehouse", element: <WareHouse /> },
        {path: "/ship", element: <Ship /> },
        {path: "/setting", element: <Ship /> },
      ],
    },
   
    {
      path: "/login",
      element: <div>login</div>,
      
    },
  ]);

  return (
    <RouterProvider router={routers} />
  )
}

export default App
