
import './App.css'
import Home from './pages/Home/Home';
import MainNavigation from './pages/MainNavigation/MainNavigation'
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from './pages/Products/Products';
import Ship from './pages/Ship/Ship';
import BillsPage from './pages/BillsPage/BillsPage';
import SingleShip from './pages/SingleShip/SingleShip'
import AddNewOrder from './components/AddNewOrder/AddNewOrder';
import RunningOrders from './pages/RunningOrders/RunningOrders';
function App() {
 
  const routers = createBrowserRouter([
    {
      path: "",
      element: <MainNavigation />,
      children: [
        { path: "/", element: <Home /> },
        {path: "/createOrder", element: <AddNewOrder />},
        
        {path: "/runningOrders", element: <RunningOrders />},
        
         {path: "/pendingOrders", element: <BillsPage /> },
        {path: "/products", element: <Products />},

        {path: "/ship", element: <Ship /> },
        {path: "/ship/:id", element: <SingleShip /> },
       
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
