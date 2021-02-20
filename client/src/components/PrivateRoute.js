import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/providers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
