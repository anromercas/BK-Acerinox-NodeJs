import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  checklists: [],
  checklistInstances: [],
  latests: [],
  auditors: [],
  error: null,
  loading: true,
  validationError: null,
  successMessage: null
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

  async function getChecklistInstances(page, pageSize) {
    try {
      const res = await axios.get(`/api/v1/checklistInstances/${page}/${pageSize}`);

      dispatch({
        type: 'GET_CHECKLIST_INSTANCES',
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
        'Content-Type': 'application/json',
        'token': '' 
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

  async function addChecklistInstance(checklistInstance) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/checklistInstances', checklistInstance, config);

      dispatch({
        type: 'ADD_CHECKLIST_INSTANCE',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  async function updateChecklistInstanceStatus(checklistInstance, newStatus, extension) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/v1/checklistInstances/${newStatus}/${extension}`, checklistInstance, config);
      console.log("globalstate update checklistInstance: ", JSON.stringify(checklistInstance));
      console.log("globalstate newStatus: ", newStatus);
      dispatch({
        type: 'UPDATE_CHECKLIST_INSTANCE',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TA_ERROR',
        payload: err.response.data.error
      });
    }
  }
  function resetError(){
    dispatch({
      type: 'TA_ERROR',
      payload: null
    });
  }
  function setValidationError(error){
    dispatch({
      type: 'TA_VALIDATION_ERROR',
      payload: error
    });
  }
  function setSuccessMessage(message){
    dispatch({
      type: 'TA_SUCCESS_MESSAGE',
      payload: message
    });
  }
  return (<GlobalContext.Provider value={{
    checklists: state.checklists,
    checklistInstances: state.checklistInstances,
    auditors: state.auditors,
    latests: state.latests,
    error: state.error,
    loading: state.loading,
    validationError: state.validationError,
    successMessage: state.successMessage,
    getAuditors,
    getChecklists,
    getChecklistInstances,
    getLatests,
    addChecklist,
    addChecklistInstance,
    deleteChecklistInstance,
    updateChecklistInstanceStatus,
    resetError, 
    setValidationError,
    setSuccessMessage
    
  }}>
    {children}
  </GlobalContext.Provider>);
}