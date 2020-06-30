import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalState'
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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ChecklistPDF from '../../Documents/ChecklistPDF'
import { lineTypeEnum } from '../../../model/enums'

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});
export const TA_TableRowDetails = ({row}) => {
  const { updateChecklistInstanceStatus } = useContext(GlobalContext);
  const [ comments, setComments ] = useState(row.comments.reduce((prev, current) => prev.concat(current + '\n'), ''));
  const [ extension, setExtension ] = useState(true);
  const [ pdfLink, setPdfLink ] = useState(false);

  async function updateTaskStatus(event, newStatus, extension){
    event.preventDefault();
    row.comments = [comments];
    console.log('row.comments ' + row.comments);
   const res = await updateChecklistInstanceStatus(row, newStatus, extension);
  }
  function generatePdf(event){
    event.preventDefault();
    console.log("To PDF document");
    //export document to PDF
    setPdfLink(!pdfLink);
  }
  console.log('!Row: ', row);
  return (
    <Grid container spacing={3}>
      {row.content !== undefined && row.content.map(section => {
        return (<ChecklistSection checkpoints={section.checkpoints} sectionName={section.section} />)
      })}
      <Grid item xs={8}>
          <TextField
            fullWidth
            id="outlined-textarea"
            label="Comentarios"
            placeholder="Introduzca sus comentarios"
            multiline
            variant="outlined"
            defaultValue={comments} 
            rows={8}
            onChange={(event) => setComments(event.target.value)}
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
              <br/>
              <FormControlLabel control={<Checkbox checked={extension} onChange={()=> setExtension(!extension)} name="extension" />} label="Conceder 5 dias más"/>
            </ThemeProvider>
            </Grid>
          <Grid item>
            {/* <Typography variant="body"> Export </Typography> */}
            Exportar
            <IconButton area-label="export" onClick={(event) => generatePdf(event)}>
              <PDFIcon/>
            </IconButton>
            {pdfLink && <ChecklistPDF checklistInstance={row}/>}
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

  const handleOnClickImage = (newImage) => {
    setImage(newImage);
    setShowImage(newImage !== '' ? true : false );
  }
  return (<>
    <Grid item xs={12}>
        <Paper variant='outlined'>
          {checkpoint.name}
        </Paper>
        <Typography variant="overline" display="block" align="right" gutterBottom >
          Puntuación: {checkpoint.score}
        </Typography>
        <div className={classes.root}>
          {checkpoint.observations.map((observation) => {
               return (
               <Grid item xs={12}>
                <GridList className={classes.gridList} >
                 {observation.images.map((image) => (
                   <GridListTile key={image}>
                     <img src={image} alt="" onClick={() => handleOnClickImage(image)}/>
                     <GridListTileBar
                       title={observation.text}
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
const ChecklistSection = ({sectionName, checkpoints}) => {
  return (
    <>
    <Typography variant="h5" align="left">
      {sectionName}
    </Typography>
    {checkpoints.map(checkpoint => {
      switch(checkpoint.type){
        case lineTypeEnum.FIXED_LINE:
          return (
            <Fixedlinescontent checkpoint={checkpoint}/>
            )
        case lineTypeEnum.FREE_LINE:
            return (
            <FreelinesContent checkpoint={checkpoint}/>
            )
        default: 
          return (undefined)
      }
    })}
  </>)
}
const Fixedlinescontent = ({checkpoint}) => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [showImage, setShowImage] = useState(false);

  const handleOnClickImage = (newImage) => {
    setImage(newImage);
    setShowImage(newImage !== '' ? true : false );
  }
  return (
    <>
      <Grid item xs={12}>
        <Paper variant='outlined'>
          {checkpoint.name} ⌇ {checkpoint.checked ? 'Si' : 'No'}
        </Paper>
        <Typography variant="overline" display="block" align="right" gutterBottom >
          Puntuación: {checkpoint.score}
        </Typography>
        <div className={classes.root}>
          {checkpoint.observations.map((observation) => {
               return (
               <Grid item xs={12}>
                <GridList className={classes.gridList} >
                 {observation.images.map((image) => (
                   <GridListTile key={image}>
                     <img src={image} alt="" onClick={() => handleOnClickImage(image)}/>
                     <GridListTileBar
                       title={observation.text}
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