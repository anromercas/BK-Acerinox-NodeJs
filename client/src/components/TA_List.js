import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export const TA_List = ({values, handleFunction}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleFunction(values[index]);
  };
  return (
  <List className={classes.root} component="nav" aria-label="secondary mailbox folder">
    {values === undefined ? "" : values.map((value, index) => 
      (<ListItem
        button
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        <ListItemText primary={value} />
      </ListItem>))}
  </List>
  )
}