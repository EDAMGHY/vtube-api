import { Navigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, token } = useAuthGlobalContext();

  if (isAuthenticated && user) {
    return children;
  }
  console.log('isAu', isAuthenticated, user, token);
  return <Navigate to='/no-account' />;
};

export default PrivateRoute;
