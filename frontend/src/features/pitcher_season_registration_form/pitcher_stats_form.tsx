import React from 'react';
import { Grid, TextField } from '@mui/material';

const BatterStatsForm = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="イニング数"
          name="innings"
          value={formData.innings}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="1/3イニング"
          name="thirds"
          value={formData.thirds}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 0, max: 2 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="勝利数"
          name="wins"
          value={formData.wins}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="敗北数"
          name="loses"
          value={formData.loses}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="セーブ数"
          name="saves"
          value={formData.saves}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="ホールド数"
          name="holdPoints"
          value={formData.holdPoints}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="試合数"
          name="games"
          value={formData.games}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="奪三振数"
          name="strikeouts"
          value={formData.strikeouts}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="与四死球数"
          name="bb"
          value={formData.bb}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="被安打数"
          name="hitsAllowedNumbers"
          value={formData.hitsAllowedNumbers}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="自責点"
          name="earnedRuns"
          value={formData.earnedRuns}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default BatterStatsForm;
