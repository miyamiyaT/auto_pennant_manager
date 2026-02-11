import React from 'react';
import { TextField, Grid2 } from '@mui/material';
import { PitcherSeason } from '../../models/pitcher_season';

type PitcherSeasonFormProps = {
  formData: PitcherSeason;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const PitcherStatsForm: React.FC<PitcherSeasonFormProps>  = ({ formData, handleChange }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="イニング数"
          name="innings"
          value={formData.innings}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 2000 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="1/3イニング"
          name="thirds"
          value={formData.thirds}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 2 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="勝利数"
          name="wins"
          value={formData.wins}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 150 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="敗北数"
          name="loses"
          value={formData.loses}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 150 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="セーブ数"
          name="saves"
          value={formData.saves}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 150 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="ホールド数"
          name="holdPoints"
          value={formData.hold_points}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 150 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="試合数"
          name="games"
          value={formData.games}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 150 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="奪三振数"
          name="strikeouts"
          value={formData.strikeouts}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 2000 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="与四死球数"
          name="bb"
          value={formData.bb}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 2000 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="被安打数"
          name="hitsAllowedNumbers"
          value={formData.hits_allowed_numbers}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 2000 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} >
        <TextField
          type="number"
          label="自責点"
          name="earnedRuns"
          value={formData.earned_runs}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 2000 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
    </Grid2>
  );
};

export default PitcherStatsForm;
