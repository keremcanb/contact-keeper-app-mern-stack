import { useReducer } from 'react';
import { get, post } from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token, isAuthenticated, loading, user, error } = state;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const { data } = await get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const registerUser = async (formData) => {
    try {
      const { data } = await post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const loginUser = async (formData) => {
    try {
      const { data } = await post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const logoutUser = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        user,
        error,
        registerUser,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
