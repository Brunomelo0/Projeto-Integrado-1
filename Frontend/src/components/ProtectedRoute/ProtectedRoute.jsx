import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { roles } from '../../roles';

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('role'); // A função do usuário está armazenada no localStorage
  // Verificar se o usuário tem permissão para acessar a rota
  if (roles[userRole] && roles[userRole].canAccess.includes(location.pathname)) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;

