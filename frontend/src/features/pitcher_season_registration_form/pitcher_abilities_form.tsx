import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

const abilities = [
  { value: 'S', label: 'S' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' }
];

const PlayerAbilitiesForm = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="球速"
          name="pitchVelocity"
          value={formData.pitchVelocity}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 80, max: 180 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="コントロール"
          name="control"
          value={formData.control}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="スタミナ"
          name="stamina"
          value={formData.stamina}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="対ピンチ"
          name="wRisp"
          value={formData.wRisp}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="対左打者"
          name="vsLbh"
          value={formData.vsLbh}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="打たれ強さ"
          name="poise"
          value={formData.poise}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="怪我しにくさ"
          name="grit"
          value={formData.grit}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="ノビ"
          name="heather"
          value={formData.heather}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="クイック"
          name="agile"
          value={formData.agile}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="回復"
          name="recovery"
          value={formData.recovery}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="特殊能力"
          name="specialAbility"
          value={formData.specialAbility}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default PlayerAbilitiesForm;
