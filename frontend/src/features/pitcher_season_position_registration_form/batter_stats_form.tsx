import React from 'react';
import { Grid, TextField } from '@mui/material';

const BatterStatsForm = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
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
          label="打数"
          name="atBats"
          value={formData.atBats}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="安打数"
          name="hits"
          value={formData.hits}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="本塁打数"
          name="homeRuns"
          value={formData.homeRuns}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="塁打数"
          name="totalBases"
          value={formData.totalBases}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="打点"
          name="rbi"
          value={formData.rbi}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="四死球"
          name="works"
          value={formData.works}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="盗塁"
          name="steals"
          value={formData.steals}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default BatterStatsForm;
