import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { TA_TableRow } from './TA_TableRow';

const columns = [
  { id: 'checklist_id.name', 
    label: 'Checklist',
    align: 'left' 
  //minWidth: 170
 },
  { 
    id: 'subType', 
    label: 'Frecuencia',
    align: 'left'
    //minWidth: 100 
  },
  {
    id: 'startDate',
    label: 'Comienza...',
    //minWidth: 170,
    align: 'left',
    format: (value) => Date(value).toLocaleString(),
  },
  {
    id: 'dueDate',
    label: 'Expira...',
    //minWidth: 170,
    align: 'left',
    format: (value) => Date(value).toLocaleString(),
  },
  {
    id: 'user_id.fullname',
    label: 'Auditor',
    //minWidth: 170,
    align: 'left'
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Estado',
    //minWidth: 170,
    align: 'left'
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'actions',
    label: 'Actions',
    //minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export const TA_Table = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { checklistInstances, getChecklistInstances } = useContext(GlobalContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=> {
    getChecklistInstances();
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {checklistInstances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((instance) => {
              return (
                <TA_TableRow columns={columns} row={instance} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={checklistInstances.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}