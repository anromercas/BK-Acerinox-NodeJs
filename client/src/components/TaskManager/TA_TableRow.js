import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { TA_TableCell } from './TA_TableCell';

export const TA_TableRow = ({ columns, row }) => {
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
    {columns.map((column) => {
      const value = column.id.split('.').reduce((prev, current) => prev && prev[current], row);
      return (
       <TA_TableCell column={column} value={value} />
      );
    })}
  </TableRow>
  )
}