import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
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
  const { checklists, getChecklists, addChecklist, auditors, getAuditors } = useContext(GlobalContext); 
  const [subType, setSubType] = useState('PUNTUAL');
  const [selectedDate, setSelectedDate] = useState(new Date('2020-03-26T21:11:54'));
  const [auditor, setAuditor] = useState(null)
  const [checklistSelected, setChecklistSelected] = useState(null)
  const [menu, setMenu] = useState(0);
  const handleTypeChange = event => {
    setSubType(event.target.value);
  };

  const tabNames = ["Checklist", "OPS"];
  const menuIcons = ["PlaylistAddCheckRounded", "WarningRounded"];
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const createNewTask = useCallback((e) => {
    e.preventDefault();
    //CREATE A NEW checklist instance for auditor
    if (auditor !== undefined && auditor !== null &&
      checklistSelected !== undefined && checklistSelected !== null){
      const checklistInstance = {
          
      };
      addChecklist(checklistInstance);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAuditors();
    getChecklists();
  }, [menu]);
  const filterChecklists = () => {
    const result =  menu ? checklists.filter(checklist => checklist.type !== "CHECKLIST").map(checklist => checklist.name) : checklists.filter(checklist => checklist.type !== "OPS").map(checklist => checklist.name); 
    console.log("RESULT lenght " + JSON.stringify(result[0]));
    return result;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={4} md={4} lg={4}>
        <Paper>
          <Typography variant="h6" align="center"> Tarea </Typography>
          <Divider />
          <TA_Menu tabNames={tabNames} icons={menuIcons} handleSelection={setMenu} />
          <TA_List values={filterChecklists()} handleFunction={setChecklistSelected} />
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
              <RadioGroup aria-label="perioricidad" name="periodo" value={subType} onChange={handleTypeChange}>
                <FormControlLabel value="PUNTUAL" control={<Radio color="secondary"/>} label="Puntual" />
                <FormControlLabel value="PUNTUAL_SEMANAL" control={<Radio color="secondary"/>} label="Puntual Semanal" />
                <FormControlLabel value="PUNTUAL_MENSUAL" control={<Radio color="secondary"/>} label="Puntual Mensual" />
                <FormControlLabel value="PUNTUAL_ALEATORIA" control={<Radio color="secondary"/>} label="Puntual Aleatoria" />
                <FormControlLabel value="SEMANAL" control={<Radio color="secondary"/>} label="Semanal" />
                <FormControlLabel value="MENSUAL" control={<Radio color="secondary"/>} label="Mensual" />
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