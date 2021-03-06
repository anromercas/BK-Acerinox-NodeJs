import React, { useState, useEffect} from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'; 
import { IncidentsByCategory } from '../Common/IncidentsByCategory'
import { IncidentsByMonthOrYear } from '../Common/IncidentsByMonthOrYear'
import { SuperTable } from '../Common/SuperTable'
import axios from 'axios'

export const Checklist = ({height}) => {
  const [data, setData] = useState(undefined);
  async function retrieveData () {
    try {
      const res = await axios.get('/api/v1/queries/statistics/aggregationTableData/checklist');
      console.log("Data from checklist supertable ", res.data.data);
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
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs>
        <Typography variant="h5" color="textSecondary" align="left">
          Checklist
        </Typography>
        <IncidentsByMonthOrYear type={"checklist"}/>
      </Grid>
      <Grid item xs>
        <IncidentsByCategory/>
      </Grid>
      <Grid item xs>
        {data !== undefined ? <SuperTable columns={data.columns} rows={data.rows} title={"nota media por tipo de incidencia"}/> : ""}
      </Grid>
     </Grid>
    // <Box height={height} width="100%">
    //   <Typography variant="h6" color="textSecondary" align="left">
    //   Checklist
    //    </Typography>
    //   <Box height="53%" mx={0.5} width="100%" display="inline-block">
    //    <IncidentsByMonthOrYear/>
    //   </Box>
    //   <Box height="23%" mx={0.5} width="100%" display="inline-block">
    //    <IncidentsByCategory/>
    //   </Box>
    //   <Box height="23%" mx={0.5} width="100%" display="inline-block">
    //     {data !== undefined ? <SuperTable columns={data.columns} rows={data.rows}/> : ""}
    //   </Box>
    // </Box>
  )
}