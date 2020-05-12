import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { TA_TableCellValue } from './TA_TableCellValue';
import { TA_TableCellAction } from './TA_TableCellAction';

export const TA_TableRow = ({ columns, row }) => {
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
    {columns.map((column) => {
      let child = undefined;
      switch (column.type){
        case 'value':
          const value = column.id.split('.').reduce((prev, current) => prev && prev[current], row);
          child = (
            <TA_TableCellValue column={column} value={value} />
          );
          break;
        case 'action':
          child = (
            <TA_TableCellAction column={column} id={row._id} value={row.status} />
          );
          break;
        default: 
          break
      }
      return child;
    })}
  </TableRow>
  )
}