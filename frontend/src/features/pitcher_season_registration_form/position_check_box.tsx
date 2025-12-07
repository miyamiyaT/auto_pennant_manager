import React from 'react';
import { FormControlLabel, Checkbox, Grid } from '@mui/material';

interface PositionCheckboxesProps {
  playerData: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PositionCheckboxes: React.FC<PositionCheckboxesProps> = ({ playerData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.starter} onChange={handleChange} name="starter" />}
          label="先発"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.relief} onChange={handleChange} name="relief" />}
          label="中継"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.closer} onChange={handleChange} name="closer" />}
          label="抑え"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.catcher} onChange={handleChange} name="catcher" />}
          label="捕手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.first} onChange={handleChange} name="first" />}
          label="一塁"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.second} onChange={handleChange} name="second" />}
          label="二塁"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.third} onChange={handleChange} name="third" />}
          label="三塁"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.short} onChange={handleChange} name="short" />}
          label="遊撃"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.outfielder} onChange={handleChange} name="outfielder" />}
          label="外野"
        />
      </Grid>
    </Grid>
  );
};

export default PositionCheckboxes;
