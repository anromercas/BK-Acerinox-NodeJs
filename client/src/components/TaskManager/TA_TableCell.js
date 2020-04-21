import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';

export const TA_TableCell = ({ column, value }) => {
  return (
    <TableCell key={column.id} align={column.align}>
      {column.format ? column.format(value) : value}
    </TableCell>
  )
}