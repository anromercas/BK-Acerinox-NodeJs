import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';

export const TA_Columns = () => {
  const { updateChecklistInstanceStatus, error } = useContext(GlobalContext);
  return [
    { 
      type: 'value',
      id: 'checklist_id.name', 
      label: 'Checklist',
      align: 'left' 
    //minWidth: 170
   },
    { 
      type: 'value',
      id: 'subType', 
      label: 'Frecuencia',
      align: 'left'
      //minWidth: 100 
    },
    {
      type: 'value',
      id: 'startDate',
      label: 'Comienza...',
      //minWidth: 170,
      align: 'left',
      format: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
      }
    },
    {
      type: 'value',
      id: 'dueDate',
      label: 'Expira...',
      //minWidth: 170,
      align: 'left',
      format: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
      }
    },
    {
      type: 'value',
      id: 'user_id.fullname',
      label: 'Auditor',
      //minWidth: 170,
      align: 'left'
      //format: (value) => value.toFixed(2),
    },
    {
      type: 'value',
      id: 'status',
      label: 'Estado',
      //minWidth: 170,
      align: 'left'
      //format: (value) => value.toFixed(2),
    },
    {
      type: 'action',
      id: 'actions',
      label: 'Actions',
      //minWidth: 170,
      align: 'right',
      callback: (id, newValue) => updateChecklistInstanceStatus(id, newValue)
    }
  ];
} 