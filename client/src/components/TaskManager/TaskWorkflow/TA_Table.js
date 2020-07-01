import React, { useState, useEffect, useMemo, useContext } from 'react';
import { GlobalContext } from "../../../context/GlobalState";
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
import { TA_Columns } from './TA_Columns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OPSIcon from '@material-ui/icons/WarningRounded';
//import ChecklistIcon 
import ChecklistIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import { Typography } from '@material-ui/core';
import { subTypeEnumDefault } from '../../../model/enums';
import { get } from 'mongoose';
const { typeEnum, typeEnumDefault, statusEnum } = require('../../../model/enums');

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const initialDefaultChecklists = 100;


export const TA_Table = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  // const [pagesVisited, setPagesVisited] = useState({
  //   'CHECKLIST': [0],
  //   'OPS': [0]
  // })
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState(typeEnumDefault);
  const { checklistInstances, getChecklistInstances } = useContext(GlobalContext);
  const [checklistsToShow, setChecklistsToShow] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [opss, setOpss] = useState([]);
  const columns = TA_Columns();
  
  const handleChangePage = (event, newPage) => {
    // console.log('pagesVisited before: ', JSON.stringify(pagesVisited));
    // if (!pagesVisited[type].includes(newPage)){
    //   getChecklistInstances(type, newPage, rowsPerPage);
    //   pagesVisited[type].push(newPage);
    //   console.log('pagesVisited after: ', JSON.stringify(pagesVisited));
    // }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    // opss = [];
    // checklists = [];
    // getChecklistInstances(typeEnum.CHECKLIST, 0, initialDefaultChecklists);
    // getChecklistInstances(typeEnum.OPS, 0, initialDefaultChecklists);
  };
  const changeType = (type) => {
    setType(type);
    switch (type){
      case typeEnum.CHECKLIST:
        setChecklistsToShow(checklists);
        break;
      case typeEnum.OPS:
        setChecklistsToShow(opss);
        break;
      default: 
        console.log("No checklist type matched!"); 
        break;
    }
  }
  const handleTypeSelected = (event) => {
    setType(event.target.value);
    changeType(event.target.value);
  };
  
  useEffect( ()=> {
    getChecklistInstances(typeEnum.CHECKLIST, 0, initialDefaultChecklists);
    getChecklistInstances(typeEnum.OPS, 0, initialDefaultChecklists);
  },[]);

  useMemo(() => {
    let _opss = []
    let _checklists = [];
    checklistInstances.forEach(c => {
      if (c.checklist_id.type === typeEnum.OPS) //&& !opss.find(({_id}) => _id === c._id))
          _opss.push(c);
      else if (c.checklist_id.type === typeEnum.CHECKLIST) //&& !checklists.find(({_id}) => _id === c._id))
            _checklists.push(c);
    })
   
    const order = [statusEnum.A_REVISAR, statusEnum.NOK, statusEnum.ASIGNADA, statusEnum.OK]
    let opssSorted = [];
    let checklistsSorted = [];
    order.forEach(o => {
      opssSorted = opssSorted.concat(_opss.filter(ops => ops.status === o))
      checklistsSorted = checklistsSorted.concat(_checklists.filter(checklist => checklist.status === o))
    })
    setOpss(opssSorted);
    setChecklists(checklistsSorted);
    console.log("checklistInstances: " + checklistInstances.length);
    console.log("checklists.length: " + checklists.length);
    console.log("ops.length: " + opss.length);
  }, [checklistInstances]);

  useEffect(()=> {
    changeType(type);
  }, [opss, checklists])

  return (
    <>
    <FormControl component="fieldset">
    <FormControlLabel
      control= {<Typography variant="caption" align="center" component="body1">
       Mostrar:
       </Typography>} name="checkedChecklist"
      label=""/>
     <RadioGroup row aria-label="type" name="type" value={type} onChange={handleTypeSelected}>
      <FormControlLabel value={typeEnum.CHECKLIST} control={<Radio icon={<ChecklistIcon />} checkedIcon={<ChecklistIcon/>}/>} label="Checklist" />
      <FormControlLabel value={typeEnum.OPS} control={<Radio icon={<OPSIcon />} checkedIcon={<OPSIcon />} />} label="OPS" />
    </RadioGroup>
  </FormControl>
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
            {checklistsToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((instance) => {
              return (
                <TA_TableRow columns={columns} row={instance} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}//10,25,100
        component="div"
        count={checklistsToShow.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}