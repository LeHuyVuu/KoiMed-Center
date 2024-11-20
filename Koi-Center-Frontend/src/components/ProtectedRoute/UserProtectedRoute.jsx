import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROLE } from '../../utils/constants';

const UserProtectedRoute = () => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);
  if (isAuthorized) {
    return <Outlet />;
  } else {
    toast.error("You need to login first");
    return <Navigate to="/login" replace />;
  }
};

export default UserProtectedRoute;