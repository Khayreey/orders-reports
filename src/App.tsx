
import './App.css'
import Home from './pages/Home/Home';
import MainNavigation from './pages/MainNavigation/MainNavigation'
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';
import Ship from './pages/Ship/Ship';
import BillsPage from './pages/BillsPage/BillsPage';

function App() {
 
  const routers = createBrowserRouter([
    {
      path: "",
      element: <MainNavigation />,
      children: [
        { path: "/", element: <Home /> },
        {path: "/orders", element: <Orders /> },
        {path: "/products", element: <Products /> },
        {path: "/ship", element: <Ship /> },
        {path: "/bills", element: <BillsPage /> },
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
