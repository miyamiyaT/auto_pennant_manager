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
          control={<Checkbox checked={playerData.is_starter} onChange={handleChange} name="is_starter" />}
          label="先発"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_relief} onChange={handleChange} name="is_relief" />}
          label="中継ぎ"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_closer} onChange={handleChange} name="is_closer" />}
          label="抑え"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_catcher} onChange={handleChange} name="is_catcher" />}
          label="捕手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_first} onChange={handleChange} name="is_first" />}
          label="一塁手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_second} onChange={handleChange} name="is_second" />}
          label="二塁手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_third} onChange={handleChange} name="is_third" />}
          label="三塁手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_short} onChange={handleChange} name="is_short" />}
          label="遊撃手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={playerData.is_outfielder} onChange={handleChange} name="is_outfielder" />}
          label="外野手"
        />
      </Grid>
    </Grid>
  );
};

export default PositionCheckboxes;
