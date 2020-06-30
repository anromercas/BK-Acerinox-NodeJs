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
//DELETE
const _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJBRE1JTklTVFJBVE9SIiwiYWN0aXZlIjp0cnVlLCJfaWQiOiI1ZWM1NmM5NDAwM2Y5MTNmYzQ0MDAzZmUiLCJlbWFpbCI6Im51cmlhQG1haWwuY29tIiwiZmlyc3RuYW1lIjoiTnVyaWEiLCJzZWNvbmRuYW1lIjoiUm9tZXJvIiwibGFzdG5hbWUiOiJDYXN0aWxsbyIsImRlcGFydG1lbnQiOiJBY2VyaWEiLCJhdmF0YXIiOiJhdi0zLnBuZyIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMjBUMTc6NDQ6NTIuMTMxWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDYtMjlUMTA6MDQ6NDAuMjkzWiIsImZ1bGxuYW1lIjoiTnVyaWEgUm9tZXJvIENhc3RpbGxvIiwiX192IjowfSwiaWF0IjoxNTkzNTE3MTE2LCJleHAiOjE1OTM1NTMxMTZ9.z6h1hK2CumbVZGGyxOANSNERngCEz3F8b-238H44C2Y'
// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getAuditors() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'token': _token 
      }
    }
    try {
      const res = await axios.get('/api/v1/queries/auditors', config);

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'token': _token 
      }
    }
    try {
      const res = await axios.get('/api/v1/checklists', config);

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'token': _token 
      }
    }
    try {
      const res = await axios.get(`/api/v1/checklistInstances/${page}/${pageSize}`, config);

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'token': _token
      }
    }
    try {
      const res = await axios.get(`/api/v1/queries/latests/${quantity}`, config);

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
        'token': _token
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
        'Content-Type': 'application/json',
        'token': _token 
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
        'Content-Type': 'application/json',
        'token': _token 
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