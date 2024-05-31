import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Error/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Allusers from "../pages/Dashboard/AllUsers/Allusers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/menu",
          element: <Menu></Menu>,
        },
        {
          path: "/order/:category",
          element: <Order></Order>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
      ],
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "cart",
          element: <Cart></Cart>,
        },
        {
          path: "userHome",
          element: <UserHome></UserHome>,
        },
        {
          path: "payment",
          element: <Payment></Payment>,
        },
        {
          path: "paymentHistory",
          element: <PaymentHistory></PaymentHistory>,
        },
        {
          path:"adminHome",
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:"addItems",
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:"manageItems",
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path:"updateItem/:id",
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path: "allUsers",
          element: <AdminRoute><Allusers></Allusers></AdminRoute>,
        },
      ],
    },
    
  ]);