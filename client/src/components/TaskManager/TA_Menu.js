import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export const TA_Menu = ({tabNames, icons, handleSelection}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    //console.log("Before setting new value, value is: " + value);
    setValue(newValue);
    //console.log("After setting new value, value is: " + value);
    handleSelection(newValue);
    //console.log("newValue is:" + newValue);
  };
  const getIcon = (iconName) => {
    let iconDefault = <PlaylistAddCheckRoundedIcon/>;
    switch (iconName){
      case 'PlaylistAddCheckRounded':
        iconDefault = <PlaylistAddCheckRoundedIcon/>;
        break;
      case 'WarningRounded':
        iconDefault = <WarningRoundedIcon />;
        break;
      default: 
        break;
    }
    return iconDefault;
  }
  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        {tabNames.map((tab, index) => <Tab icon={getIcon(icons[index])} label={tab} />)}
      </Tabs>
    </Paper>
  );
}