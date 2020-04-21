import React from 'react';
import { Header } from './components/TaskManager/Header';
import { AddTask } from './components/TaskManager/AddTask';
import { TaskAssigner } from "./components/TaskManager/TaskAssigner"

import { GlobalProvider } from './context/GlobalState';

//import './App.css';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'; 
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
function App() {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const selectTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Paper elevation={0} className={classes.root}>
              <Tabs
                value={tab}
                onChange={selectTab}
                variant="standard"
                indicatorColor=""
                textColor="primary"
                aria-label="main menu tabs"
                centered
              >
                <Tab icon={<AssignmentIndRoundedIcon />} label="Asignador" />
                <Tab icon={<TimelineRoundedIcon />} label="Estadísticas" />
              </Tabs>
            </Paper>
            {tab === 0 && <TaskAssigner />} 
          </Container>
        </ThemeProvider>
      </GlobalProvider>
  );
}

export default App;
