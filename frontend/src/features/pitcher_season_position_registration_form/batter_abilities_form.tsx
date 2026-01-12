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
          label="弾道"
          name="trajectory"
          value={formData.trajectory}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 4 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="ミート"
          name="hit"
          value={formData.hit}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="パワー"
          name="power"
          value={formData.power}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="走力"
          name="runSpeed"
          value={formData.runSpeed}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="肩力"
          name="armStrength"
          value={formData.armStrength}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="守備力"
          name="fielding"
          value={formData.fielding}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="捕球"
          name="catching"
          value={formData.catching}
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
          label="チャンス"
          name="clutchRank"
          value={formData.clutchRank ? formData.clutchRank : "D"}
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
          label="対左"
          name="vsLhpRank"
          value={formData.vsLhpRank ? formData.vsLhpRank : "D"}
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
          label="キャッチャー"
          name="catcherRank"
          value={formData.catcherRank ? formData.catcherRank : null}
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
          name="gritRank"
          value={formData.gritRank ? formData.gritRank : "D"}
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
          label="盗塁"
          name="stealingRank"
          value={formData.stealingRank ? formData.stealingRank : "D"}
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
          label="走塁"
          name="runningRank"
          value={formData.runningRank ? formData.runningRank : "D"}
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
          label="送球"
          name="throwingRank"
          value={formData.throwingRank ? formData.throwingRank : "D"}
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
          name="recoveryRank"
          value={formData.recoveryRank ? formData.recoveryRank : "D"}
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
