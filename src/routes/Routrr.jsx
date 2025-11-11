import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Register from "../User/Registier";
import Login from "../User/LOgin";
import Listings from "../pages/Listings";
import CategoryByListing from "../pages/CategoryByListing";

export const routre = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/listings",
        element: <Listings />,
        loader: () => fetch("http://localhost:3000/listings"),
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryByListing />,
        loader: ({ params }) =>
          fetch(
            `http://localhost:3000/category-filtered-product/${params.categoryName}`
          ),
      },
    ],
  },
]);
