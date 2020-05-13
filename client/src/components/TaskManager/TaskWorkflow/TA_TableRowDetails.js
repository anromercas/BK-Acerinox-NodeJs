import React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTileBar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PDFIcon from '@material-ui/icons/PictureAsPdfRounded';
import Typography from '@material-ui/core/Typography'

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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>Grid list (gallery)</Paper>
      </Grid>
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
            <Button variant='contained' onClick={(event) => updateTaskStatus(event, 'OK')}>
              OK
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={(event) => updateTaskStatus(event, 'NOK')}>
              NOK
            </Button>
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
  //   <GridList className={classes.gridList} cols={2.5}>
  //   {tileData.map((tile) => (
  //     <GridListTile key={tile.img}>
  //       <img src={tile.img} alt={tile.title} />
  //       <GridListTileBar
  //         title={tile.title}
  //         classes={{
  //           root: classes.titleBar,
  //           title: classes.title,
  //         }}
  //         actionIcon={
  //           <IconButton aria-label={`star ${tile.title}`}>
  //             <StarBorderIcon className={classes.title} />
  //           </IconButton>
  //         }
  //       />
  //     </GridListTile>
  //   ))}
  // </GridList>
  )
}