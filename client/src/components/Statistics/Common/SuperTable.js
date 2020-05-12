import React, { useState, useEffect } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const SuperTable = ({columns, rows}) => {
  const today = Date.now();
  var aMonthAgo = new Date();
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(aMonthAgo);
  const classes = useStyles();
  return (
    <>
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs>
        <FormLabel component="legend">Desde</FormLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker value={fromDate} onChange={(date) => setFromDate(date) } />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs>
        <FormLabel component="legend">Hasta</FormLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker value={toDate} onChange={(date) => setToDate(date) } />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
   
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns !== undefined && columns.map((column, index)=> (<TableCell align={index === 0 ? "left" : "right"}>{column}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== undefined && rows.map((row) => (
            <TableRow key={row.Nombre}>
              <TableCell component="th" scope="row">
                {row.Nombre}
              </TableCell>
              <TableCell align="right">{row.categoría_1}</TableCell>
              <TableCell align="right">{row.categoría_2}</TableCell>
              <TableCell align="right">{row.categoría_3}</TableCell>
              <TableCell align="right">{row.categoría_4}</TableCell>
              <TableCell align="right">{row.categoría_5}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  )
}