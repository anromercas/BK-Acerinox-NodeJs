import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  checklists: [],
  latests: [],
  auditors: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getAuditors() {
    try {
      const res = await axios.get('/api/v1/queries/auditors');

      dispatch({
        type: 'GET_AUDITORS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getChecklists() {
    try {
      const res = await axios.get('/api/v1/checklists');

      dispatch({
        type: 'GET_CHECKLISTS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getLatests(quantity) {
    try {
      const res = await axios.get(`/api/v1/queries/latests/${quantity}`);

      dispatch({
        type: 'GET_LATESTS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteChecklistInstance(id) {
    try {
      await axios.delete(`/api/v1/checklistInstances/${id}`);

      dispatch({
        type: 'DELETE_CHECKLIST_INSTANCE',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addChecklist(checklist) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/checklists', checklist, config);

      dispatch({
        type: 'ADD_CHECKLIST',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    checklists: state.checklists,
    auditors: state.auditors,
    latests: state.latests,
    error: state.error,
    loading: state.loading,
    getAuditors,
    getChecklists,
    getLatests,
    addChecklist,
    deleteChecklistInstance,
  }}>
    {children}
  </GlobalContext.Provider>);
}