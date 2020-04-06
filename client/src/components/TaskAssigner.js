import React, { useContext, useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../context/GlobalState';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { TaskList } from './TaskList';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import { Icon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { TA_List } from './TA_List';
import { TA_Menu } from './TA_Menu';
import { TA_Latests } from './TA_Latests';

// import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
// import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const TaskAssigner = () => {
  const { opss, checklists, getOPSs, getChecklists, addChecklist, addOPS, auditors, getAuditors } = useContext(GlobalContext); 
  const [type, setType] = useState('puntual');
  const [taskList, setTaskList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date('2020-03-26T21:11:54'));
  const [auditor, setAuditor] = useState(null)
  const [task, setTask] = useState(null)
  const [menu, setMenu] = useState(0);
  const classes = useStyles();
  const handleTypeChange = event => {
    setType(event.target.value);
  };
  //const auditorList = ["Pepe", "Josele", "Manolo"];
  //const checklists = [{name: "Checklist GS1"}, {name: "Checklist GS2"}, {name: "Checklist SOP3"}, {name: "Checklist Torno 2"}, {name: "Checklist whatever"}];
  //const opsList = ["OPS#1", "OPS#2", "OPS#3", "OPS#4", "OPS#5", "OPS#6"];
  const tabNames = ["Checklist", "OPS"];
  const menuIcons = ["PlaylistAddCheckRounded", "WarningRounded"];
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const createNewTask = useCallback((e) => {
    e.preventDefault();
    //CREATE A NEW ops/checklist instance for auditor
    if (auditor !== undefined && auditor !== null &&
      task !== undefined && task !== null){
        switch (menu) {
          case 0:
            const checklistInstance = {
              
            };
            addChecklist(checklistInstance);
            break;
          case 1:
            const opsInstance = {
              assignee: auditor._id,
              ops_id: task._id,
              type: type,
              content: task.checkpointNames.map(cp => { return {"checkpointName": cp, "images": [], "text": ""}})
            };
            addOPS(opsInstance);
            break;
          default:
            break;
        }
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(auditor);
    console.log(task);
    getAuditors();
    getChecklists();
    getOPSs();
    switch (menu) {
      case 0:
        setTaskList(checklists);
        break;
      case 1:
        setTaskList(opss);
        break;
      default:
        console.log("default");
        break;
    }
  }, [menu]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={4} md={4} lg={4}>
        <Paper>
          <Typography variant="h6" align="center"> Tarea </Typography>
          <Divider />
          <TA_Menu tabNames={tabNames} icons={menuIcons} handleSelection={setMenu} />
          <TA_List values={taskList.map(task => task.name)} handleFunction={setTask} />
        </Paper>
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs> </Grid>          
          <Grid item xs>
            <IconButton onClick={createNewTask}>
              <ArrowForwardIosIcon fontSize="large"/>
            </IconButton>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <Paper>
          <Typography variant="h6" align="center"> Auditor </Typography>
          <Divider />
          <TA_List values={auditors.map(auditor => auditor.firstname + " " + auditor.lastname)} handleFunction={setAuditor}/>
        </Paper>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6} lg={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Perioricidad</FormLabel>
              <RadioGroup aria-label="perioricidad" name="periodo" value={type} onChange={handleTypeChange}>
                <FormControlLabel value="puntual" control={<Radio color="secondary"/>} label="Puntual" />
                <FormControlLabel value="puntual_semanal" control={<Radio color="secondary"/>} label="Puntual Semanal" />
                <FormControlLabel value="puntual_mensual" control={<Radio color="secondary"/>} label="Puntual Mensual" />
                <FormControlLabel value="puntual_aleatoria" control={<Radio color="secondary"/>} label="Puntual Aleatoria" />
                <FormControlLabel value="semanal" control={<Radio color="secondary"/>} label="Semanal" />
                <FormControlLabel value="mensual" control={<Radio color="secondary"/>} label="Mensual" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Grid container direction="column" spacing={5} justify="flex-start" alignItems="flex-start">
              <Grid item xs>
                <FormLabel component="legend">Fecha y Hora</FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <FormLabel component="legend">Repetición</FormLabel>
                {/*<IconButton>
                  <AddRoundedIcon />
                </IconButton>
                <IconButton>
                  <RemoveRoundedIcon />
                </IconButton>*/}
                <TextField id="outlined-basic" variant="outlined" type="number" defaultValue={1} inputProps={{min:0}} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    <Grid item xs={6} md={6} lg={6}>
    <FormLabel component="legend">Últimas asignadas</FormLabel>
      <TA_Latests />
    </Grid>
  </Grid>
  )
}