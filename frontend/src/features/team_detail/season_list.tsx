import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

interface Props {
  seasons: number[]
}

const SeasonList = ({ seasons }: Props) => {
  return (
    <div>
      <p>歴代シーズン</p>
      <Paper elevation={3}>
        <List component="nav">
          {seasons.map((item, index) => (
            <ListItem button key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default SeasonList;
