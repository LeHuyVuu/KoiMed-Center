// src/utils/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, role } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Kiểm tra xem vai trò của người dùng có nằm trong danh sách vai trò được phép truy cập không
  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />; // Chuyển hướng tới trang Unauthorized
  }

  return children;
};

export default ProtectedRoute;
