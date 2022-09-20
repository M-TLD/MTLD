import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => (localStorage.getItem('accessToken') ? <Outlet /> : <Navigate to="/login" />);

export default PrivateRoutes;
