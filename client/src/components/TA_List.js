import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export const TA_List = ({values, handleFunction, primaryDisplayKey, sectionKey}) => {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const classes = useStyles();
  let valuesBySection = {};
  const handleListItemClick = (event, sectionId, index) => {
    //event.preventDefault();
    setSelectedIndex([sectionId, index]);
    handleFunction(valuesBySection[sectionId][index]);
    console.log('valuesBySection returned ' + JSON.stringify(valuesBySection[sectionId][index]));
  };
 
  for (let i = 0; i < values.length; i++) {
    const aKey = values[i][sectionKey];
    if (valuesBySection.hasOwnProperty(aKey))
      valuesBySection[aKey] = [...valuesBySection[aKey], values[i]];
    else
      valuesBySection[aKey] = [values[i]];
    }
    //console.log('***valuesBySection: ' + JSON.stringify(valuesBySection));
  
   

  if (sectionKey === undefined)
    return (
      <List className={classes.root} component="nav" aria-label="secondary mailbox folder">
        {(values === undefined || values === null) ? "" : values.map((value, index) => 
          (<ListItem
            button
            selected={selectedIndex.toString() === [undefined, index].toString()}
            onClick={(event) => handleListItemClick(event, undefined, index)}>
                 {value.avatar ? <Avatar alt="A.M." src={value.avatar} className={classes.large} /> : "" }
                 <ListItemText primary={value[primaryDisplayKey]} secondary={value['role']}/>
              { value.role === 'WORKER'? 
                <StyledBadge 
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot">
                </StyledBadge> :
                "" }
         
          </ListItem>))
        }
      </List> )
  else
    return (
      <List className={classes.root} subheader={<li />}>
      {Object.keys(valuesBySection).map((sectionId) => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader color="terciary">
              <Chip label={`${sectionId}`}/>
            </ListSubheader>
            {valuesBySection[sectionId].map((item, index) => (
              <ListItem key={`${sectionId}-${item._id}`}
              button
              selected={selectedIndex.toString() === [sectionId, index].toString()}
              onClick={(event) => handleListItemClick(event, sectionId, index)}>
                {item.avatar ? <Avatar alt="A.M." src={item.avatar} /> : "" }
                <ListItemText primary={`${item.name}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
      </List> )     
}