import React from 'react';
import { Navigate } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from '../pages/dashboard/Overview';
import Profile from '../pages/dashboard/Profile';
import MyItems from '../pages/dashboard/user/MyItems';
import ManageUsers from '../pages/dashboard/admin/ManageUsers';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

export const dashboardRoutes = {
    path: "/dashboard",
    element: (
        <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>
    ),
    children: [
        {
            index: true,
            element: <Navigate to="/dashboard/overview" replace />
        },
        {
            path: "overview",
            element: <Overview />
        },
        {
            path: "profile",
            element: <Profile />
        },
        {
            path: "my-items",
            element: <MyItems />
        },
        {
            path: "admin/manage-users",
            element: (
                <AdminRoute>
                    <ManageUsers />
                </AdminRoute>
            )
        }
    ]
};

export default dashboardRoutes;
