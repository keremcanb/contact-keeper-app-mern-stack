import { useReducer, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import reducer from '../reducers/alert';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertContext = createContext();
const initialState = [];

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
