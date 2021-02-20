import { useReducer, createContext, useContext } from 'react';
import axios, { get, post, put } from 'axios';
import reducer from '../reducers/contact';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactContext = createContext();
const initialState = {
  contacts: null,
  current: null,
  filtered: null,
  error: null
};
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { contacts, current, filtered, error } = state;

  const getContacts = async () => {
    try {
      const { data } = await get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const addContact = async (contact) => {
    try {
      const { data } = await post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const updateContact = async (contact) => {
    try {
      const { data } = await put(`/api/contacts/${contact._id}`, contact, config);
      dispatch({
        type: UPDATE_CONTACT,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const setCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        current,
        filtered,
        error,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => useContext(ContactContext);
