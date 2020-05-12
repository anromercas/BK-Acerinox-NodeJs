import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'; 
import { IncidentsByCategory } from '../Common/IncidentsByCategory'
import { IncidentsByMonthOrYear } from '../Common/IncidentsByMonthOrYear'
import { SuperTable } from '../Common/SuperTable'
import { Fulfillment } from './Fulfillment'
import axios from 'axios'

export const OPS = ({height}) => {
  const [data, setData] = useState(undefined);
  async function retrieveData () {
    try {
      const res = await axios.get('/api/v1/queries/statistics/aggregationTableData/ops');
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    retrieveData();
  }, []);
  return (
    // <Box height={height} width="100%">
    //   <Typography variant="h6" color="textSecondary" align="left">
    //     OPS
    //   </Typography>
    //   <Box height="25%" mx={0.5} width="100%" display="inline-block">
    //     <IncidentsByMonthOrYear/>
    //   </Box>
    //   <Box height="25%" mx={0.5} width="100%" display="inline-block">
    //     <IncidentsByCategory/>
    //   </Box>
    //   <Box height="25%" mx={0.5} width="100%" display="inline-block">
    //     {data !== undefined ? <SuperTable rows={data.rows} columns={data.columns}/> : ""}
    //   </Box>
    //   <Box height="25%" mx={0.5} width="50%" display="inline-block">
    //     <Fulfillment/>
    //   </Box>
    // </Box>
     <Grid container direction="column" justify="center" alignItems="center">
     <Grid item xs>
       <Typography variant="h6" color="textSecondary" align="left">
         OPS
       </Typography>
       <IncidentsByMonthOrYear type={"ops"}/>
     </Grid>
     <Grid item xs>
       <IncidentsByCategory/>
     </Grid>
     <Grid item xs>
       {data !== undefined ? <SuperTable columns={data.columns} rows={data.rows}/> : ""}
     </Grid>
     <Grid item xs>
        <Fulfillment/>
     </Grid>
    </Grid>
  )
}