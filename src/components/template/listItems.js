import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'; 
import PeopleIcon from '@mui/icons-material/People'; 

export const mainListItems = (
  <React.Fragment>
    <ListItemButton> 
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Pacientes" /> 
    </ListItemButton> 
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
 
  </React.Fragment>
);