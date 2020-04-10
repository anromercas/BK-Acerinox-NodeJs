import React from 'react';
import { Header } from './components/Header';
import { AddTask } from './components/AddTask';
import { TaskAssigner } from "./components/TaskAssigner"

import { GlobalProvider } from './context/GlobalState';

//import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  return (
      <GlobalProvider>
        <Container maxWidth="lg">
          <Header />
            <ThemeProvider theme={theme}>
               <TaskAssigner />
            </ThemeProvider>
        </Container>
      </GlobalProvider>
  );
}

export default App;
