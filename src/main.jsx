import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { routre } from "./routes/Routrr";
import AuthProvider from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routre}></RouterProvider>
      <ToastContainer/>
    </AuthProvider>
  </StrictMode>
);
