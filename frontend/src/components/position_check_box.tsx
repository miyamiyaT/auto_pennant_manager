import React from 'react';
import { FormControlLabel, Checkbox, Grid2 } from '@mui/material';
import { PlayerSeason } from '../models/player_season';

type PlayerSeasonFormProps = {
  formData: PlayerSeason;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

// 選手のポジション情報登録部分
const PositionCheckboxes: React.FC<PlayerSeasonFormProps> = ({ formData, handleChange }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_starter} onChange={handleChange} name="is_starter" />}
          label="先発"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_relief} onChange={handleChange} name="is_relief" />}
          label="中継"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_closer} onChange={handleChange} name="is_closer" />}
          label="抑え"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_catcher} onChange={handleChange} name="is_catcher" />}
          label="捕手"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_first} onChange={handleChange} name="is_first" />}
          label="一塁"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_second} onChange={handleChange} name="is_second" />}
          label="二塁"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_third} onChange={handleChange} name="is_third" />}
          label="三塁"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_short} onChange={handleChange} name="is_short" />}
          label="遊撃"
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={formData.is_outfielder} onChange={handleChange} name="is_outfielder" />}
          label="外野"
        />
      </Grid2>
    </Grid2>
  );
};

export default PositionCheckboxes;
