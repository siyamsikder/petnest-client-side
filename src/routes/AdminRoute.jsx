import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <LoadingSpinner />;
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
