import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Error/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";

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
      ],
    },
  ]);