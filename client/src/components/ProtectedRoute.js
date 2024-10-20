// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './Auth/Auth';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }
//   console.log(children,'eeeeeeeeee')
//   return children;
// };

// export default ProtectedRoute;



import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Auth/Auth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;  // This will render any child routes that are inside this protected route
};

export default ProtectedRoute;
