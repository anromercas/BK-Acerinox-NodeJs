import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'
import { TA_TableCellValue } from './TA_TableCellValue';
import { TA_TableCellAction } from './TA_TableCellAction';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import { TA_TableRowDetails } from './TA_TableRowDetails'

export const TA_TableRow = ({ columns, row }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <TableRow hover key={row._id}>
      <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
      </TableCell>
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
   <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box margin={1}>
         <TA_TableRowDetails />
        </Box>
       </Collapse>
    </TableCell>
  </TableRow>
  </>
  )
}