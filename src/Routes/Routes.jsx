import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Error/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";

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
      ],
    },
  ]);