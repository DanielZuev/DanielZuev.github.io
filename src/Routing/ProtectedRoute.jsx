import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the element passed to ProtectedRoute
  return React.cloneElement(element, { ...rest });
};

// PropTypes
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;













// import { Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('token');

//   // If not authenticated, redirect to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the component passed to ProtectedRoute
//   return <Component {...rest} />;
// };

// // PropTypes
// ProtectedRoute.propTypes = {
//   component: PropTypes.elementType.isRequired,
// };

// export default ProtectedRoute;
