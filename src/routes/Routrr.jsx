import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Register from "../User/Registier";
import Login from "../User/LOgin";
import Listings from "../pages/Listings";
import CategoryByListing from "../pages/CategoryByListing";
import RecentListings from "../pages/RecentListings";
import ErrorPage from "../pages/ErrorPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import MyOrders from "../pages/MyOrders";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import PrivetRouts from "../contexts/PrivetRouts";
import { dashboardRoutes } from "./DashboardRoutes";

export const routre = createBrowserRouter([
  dashboardRoutes,
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      {
        path: "/pets-supplies",
        element: <Listings />,
        loader: () => fetch("https://petnest-one.vercel.app/listings"),
      },
      {
        path: "/listing/:id",
        element: (
          <PrivetRouts>
            <ProductDetailsPage />
          </PrivetRouts>
        ),
        loader: ({ params }) =>
          fetch(`https://petnest-one.vercel.app/listings/${params.id}`),
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: (
          <PrivetRouts>
            <CategoryByListing />
          </PrivetRouts>
        ),
        loader: ({ params }) =>
          fetch(
            `https://petnest-one.vercel.app/category-filtered-product/${params.categoryName}`
          ),
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },

      {
        path: "/add-listing",
        element: (
          <PrivetRouts>
            <AddListing />
          </PrivetRouts>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivetRouts>
            <MyListings />
          </PrivetRouts>
        ),
      },
    ],
  },
]);
