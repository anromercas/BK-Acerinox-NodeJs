import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import TableCell from '@material-ui/core/TableCell';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const statusEnum = Object.freeze({
  ASSIGNED: 'ASSIGNED', 
  REVIEW_PENDING: 'REVIEW_PENDING',
  REVIEWED: 'REVIEWED'
});
export const TA_TableCellAction = ({ column, id, value }) => {
  const { getChecklists } = useContext(GlobalContext);
  const [status, setStatus] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setStatus(newValue);
    column.callback(id, newValue);
  };
  return ( 
  <TableCell key={column.id} align={column.align}>
     <InputLabel id="demo-simple-select-label">Pasar a</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleChange}
        >
          {Object.keys(statusEnum).map(key => <MenuItem value={key}>{key}</MenuItem>)}
        </Select>
  </TableCell>)

}