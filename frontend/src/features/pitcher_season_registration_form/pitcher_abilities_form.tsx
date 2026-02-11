import React from 'react';
import { TextField, MenuItem, Grid2 } from '@mui/material';

import { PitcherAbility } from '../../models/pitcher_ability';

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

type PlayerAbilitiesFormProps = {
  formData: PitcherAbility;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const PlayerAbilitiesForm: React.FC<PlayerAbilitiesFormProps>  = ({ formData, handleChange }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="球速"
          name="pitch_velocity"
          value={formData.pitch_velocity}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 80, max: 180 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="コントロール"
          name="control"
          value={formData.control}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 100 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="スタミナ"
          name="stamina"
          value={formData.stamina}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 100 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="対ピンチ"
          name="w_risp_rank"
          value={formData.w_risp_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="対左打者"
          name="vs_lbh_rank"
          value={formData.vs_lbh_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="打たれ強さ"
          name="poise_rank"
          value={formData.poise_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="怪我しにくさ"
          name="grit_rank"
          value={formData.grit_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="ノビ"
          name="heather_rank"
          value={formData.heather_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="クイック"
          name="agile_rank"
          value={formData.agile_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="回復"
          name="recovery_rank"
          value={formData.recovery_rank}
          onChange={handleChange}
          fullWidth
        >
          {abilities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          label="特殊能力"
          name="special_ability"
          value={formData.special_ability}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </Grid2>
    </Grid2>
  );
};

export default PlayerAbilitiesForm;
