import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  tasks: [],
  checklists: [],
  opss: [],
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
  async function getTasks() {
    try {
      const res = await axios.get('/api/v1/tasks');

      dispatch({
        type: 'GET_TASKS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getOPSs() {
    try {
      const res = await axios.get('/api/v1/opss');

      dispatch({
        type: 'GET_OPSS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'OPS_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getAuditors() {
    try {
      const res = await axios.get('/api/v1/queries/auditors');

      dispatch({
        type: 'GET_AUDITORS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'OPS_ERROR',
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
        type: 'OPS_ERROR',
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
        type: 'OPS_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);

      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
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
        type: 'TASK_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  async function deleteOPSInstance(id) {
    try {
      await axios.delete(`/api/v1/opsInstances/${id}`);
      
      dispatch({
        type: 'DELETE_OPS_INSTANCE',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
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
        type: 'TASK_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addOPS(ops) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/opss', ops, config);

      dispatch({
        type: 'ADD_OPS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addTask(task) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/tasks', task, config);

      dispatch({
        type: 'ADD_TASK',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    tasks: state.tasks,
    opss: state.opss,
    checklists: state.checklists,
    auditors: state.auditors,
    latests: state.latests,
    error: state.error,
    loading: state.loading,
    getTasks,
    getAuditors,
    getOPSs,
    getChecklists,
    getLatests,
    addTask,
    addChecklist,
    addOPS,
    deleteTask,
    deleteChecklistInstance,
    deleteOPSInstance
  }}>
    {children}
  </GlobalContext.Provider>);
}