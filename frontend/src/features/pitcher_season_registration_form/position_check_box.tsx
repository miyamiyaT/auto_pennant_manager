import React from 'react';
import { FormControlLabel, Checkbox, Grid } from '@mui/material';
import { PlayerSeason } from '../../models/player_season';

type PlayerSeasonFormProps = {
  formData: PlayerSeason;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const PositionCheckboxes: React.FC<PlayerSeasonFormProps> = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_starter} onChange={handleChange} name="is_starter" />}
          label="先発"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_relief} onChange={handleChange} name="is_relief" />}
          label="中継"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_closer} onChange={handleChange} name="is_closer" />}
          label="抑え"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_catcher} onChange={handleChange} name="is_catcher" />}
          label="捕手"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_first} onChange={handleChange} name="is_first" />}
          label="一塁"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_second} onChange={handleChange} name="is_second" />}
          label="二塁"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_third} onChange={handleChange} name="is_third" />}
          label="三塁"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_short} onChange={handleChange} name="is_short" />}
          label="遊撃"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_outfielder} onChange={handleChange} name="is_outfielder" />}
          label="外野"
        />
      </Grid>
    </Grid>
  );
};

export default PositionCheckboxes;
