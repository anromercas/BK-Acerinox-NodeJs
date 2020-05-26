import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { SuperTable } from '../Common/SuperTable'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

export const Incidents = () => {
  const [data, setData] = useState(undefined);
  async function retrieveData () {
    try {
      const res = await axios.get('/api/v1/queries/statistics/aggregationTableData/incident');
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
          Incidentes
        </Typography>
        {data !== undefined ? <SuperTable columns={data.columns} rows={data.rows}/> : ""}
      </Grid>
   </Grid>
  )
}