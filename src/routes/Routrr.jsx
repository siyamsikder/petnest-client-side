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
import PrivateRoute from "./PrivateRoute";
import { dashboardRoutes } from "./DashboardRoutes";
import API_BASE_URL from "../config/api";

export const routre = createBrowserRouter([
  dashboardRoutes,
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "pets-supplies",
        element: <Listings />,
        loader: async () => {
          const res = await fetch(`${API_BASE_URL}/listings`);
          return res.ok ? res.json() : [];
        },
      },
      {
        path: "listing/:id",
        element: <ProductDetailsPage />,
        loader: async ({ params }) => {
          try {
            // 1. Try direct ID fetching first (optimized)
            const endpoints = [
              `${API_BASE_URL}/listings/${params.id}`,
              `${API_BASE_URL}/listing/${params.id}`,
              `${API_BASE_URL}/product/${params.id}`
            ];

            for (const url of endpoints) {
              const res = await fetch(url);
              if (res.ok) {
                const text = await res.text();
                if (text && text.trim().length > 0) {
                  try {
                    return JSON.parse(text);
                  } catch (e) {
                    console.error("JSON parse error for URL:", url);
                  }
                }
              }
            }

            // 2. Universal Fallback: Fetch ALL and find by ID locally
            // This is very robust because we know /listings works for the main page
            const allRes = await fetch(`${API_BASE_URL}/listings`);
            if (allRes.ok) {
              const allItems = await allRes.json();
              const found = allItems.find(item => item._id === params.id);
              if (found) return found;
            }

            return null;
          } catch (error) {
            console.error("Listing loader error:", error);
            return null;
          }
        },
      },
      {
        path: "category-filtered-product/:categoryName",
        element: <CategoryByListing />,
        loader: async ({ params }) => {
          const res = await fetch(`${API_BASE_URL}/category-filtered-product/${params.categoryName}`);
          return res.ok ? res.json() : [];
        },
      },


    ],
  },
]);
