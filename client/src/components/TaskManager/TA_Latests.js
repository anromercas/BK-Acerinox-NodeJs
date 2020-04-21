import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { TA_Task } from './TA_Task';

import { GlobalContext } from '../../context/GlobalState';

export const TA_Latests = () => {
  const { latests, getLatests } = useContext(GlobalContext);

  useEffect(() => {
    getLatests(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item xs>
        {/** padding */}
      </Grid>
      {latests === undefined ? "" : latests.map(task => (
        <Grid item xs>
          <TA_Task key= {task._id} task={task} />
        </Grid>))
      }
    </Grid>
  )
}
