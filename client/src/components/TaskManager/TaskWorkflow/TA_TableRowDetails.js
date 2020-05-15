import React, { useState, useEffect } from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PDFIcon from '@material-ui/icons/PictureAsPdfRounded'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import Dialog from '@material-ui/core/Dialog'

const lineTypeEnum = Object.freeze({
  FREE_LINE: 'FREE_LINE',
  FIXED_LINE: 'FIXED_LINE'
});//TO REFACTOR
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});
export const TA_TableRowDetails = ({row}) => {
  function updateTaskStatus(event, action){
    event.preventDefault();
    switch (action){
      case 'OK':
        console.log(action);
        break;
      case 'NOK':
        console.log(action);
        break;
      default: 
        console.log(action);
        break;
    }
  }
  function exportToPdf(event){
    event.preventDefault();
    console.log("To PDF document");
    //export document to PDF
  }
  console.log('Row: ', row);
  return (
    <Grid container spacing={3}>
      {row.content !== undefined && row.content.map(checkpoint => {
        switch(checkpoint.type){
          case lineTypeEnum.FIXED_LINE:
            return (
              <Fixedlinexcontent checkpoint={checkpoint}/>
              )
            break;
          case lineTypeEnum.FREE_LINE:
              return (
              <FreelinesContent checkpoint={checkpoint}/>)
            break;
          default: 
            break;
        }
      })}
      <Grid item xs={8}>
          <TextField
            fullWidth
            id="outlined-textarea"
            label="Comentarios"
            placeholder="Introduzca sus comentarios"
            multiline
            variant="outlined"
            defaultValue={"Ningún comentario aún"}
            rows={8}
          />
      </Grid>
      <Grid item xs={4}>
        <Grid container direction='column' align='left' spacing={2}>
            <Grid item>
            <ThemeProvider theme={theme}>
              <Button variant='contained' color="primary" onClick={(event) => updateTaskStatus(event, 'OK')}>
                OK
              </Button>
             </ThemeProvider>
            </Grid>
            <Grid item>
            <ThemeProvider theme={theme}>
              <Button variant='contained' color="secondary" onClick={(event) => updateTaskStatus(event, 'NOK')}>
                NOK
              </Button>
            </ThemeProvider>
            </Grid>
          <Grid item>
            {/* <Typography variant="body"> Export </Typography> */}
            Export
            <IconButton area-label="export" onClick={(event) => exportToPdf(event)}>
              <PDFIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const FreelinesContent = ({checkpoint}) => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [showImage, setShowImage] = useState(false);
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   setShowImage(!showImage);
  // }, [image]);
  // const showImage = () => {
  //   setShowImage(true);
  // }
  // const closeImage = () => {
  //   setShowImage(false)
  // }
  const handleOnClickImage = (newImage) => {
    setImage(newImage);
    setShowImage(newImage !== '' ? true : false );
  }
  return (<>
    <Grid item xs={12}>
        <Paper variant='outlined'>
          {checkpoint.name}
        </Paper>
        Score: {checkpoint.score}
        <div className={classes.root}>
          {checkpoint.freeValues.map((freeValue) => {
               return (
               <Grid item xs={12}>
                <GridList className={classes.gridList} >
                 {freeValue.images.map((image) => (
                   <GridListTile key={image}>
                     <img src={image} alt="" onClick={() => handleOnClickImage(image)}/>
                     <GridListTileBar
                       title={freeValue.text}
                       classes={{
                         root: classes.titleBar,
                         title: classes.title,
                       }}
                     />
                   </GridListTile>
                 ))}
                </GridList>
             </Grid>)
          })}
        </div>
    </Grid>
    
      <Dialog aria-labelledby="simple-dialog-title" open={showImage} onClose={() => handleOnClickImage('')}>
        <img src={image} alt="" />
      </Dialog>
    </>
   )
}
const Fixedlinexcontent = ({checkpoint}) => {
  return (
      <Grid item xs={12}>
        <Paper variant='outlined'>
          {checkpoint.name} {checkpoint.fixedValues[0]._value}
        </Paper>
        Score: {checkpoint.score}
      </Grid>
  )
}