import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return children;
};

export default ProtectedRoute;
