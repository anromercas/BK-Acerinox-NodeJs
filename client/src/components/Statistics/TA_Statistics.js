import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import Box from '@material-ui/core/Box';
import { Checklist } from './Checklist/Checklist'
import { OPS } from './OPS/OPS'
import Grid from '@material-ui/core/Grid'

export const TA_Statistics = () => {
 
  return ( 
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs>
        <Checklist />
      </Grid>
      <Grid item xs>
        <OPS />
      </Grid>
    </Grid>
    // <Box height={3000} width="100%">
    //   <Checklist height={1500}/>
    //   <OPS height={1500}/>
    // </Box>
  )
}