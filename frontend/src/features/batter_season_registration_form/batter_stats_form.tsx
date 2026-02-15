import React from 'react';
import { Grid2, TextField } from '@mui/material';
import { BatterSeason } from '../../models/batter_season';

type BatterSeasonFormProps = {
  formData: BatterSeason;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const BatterStatsForm: React.FC<BatterSeasonFormProps>  = ({ formData, handleChange }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 3 }}>
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
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="打数"
          name="at_bat"
          value={formData.at_bat}
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
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="安打数"
          name="hits"
          value={formData.hits}
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
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="本塁打数"
          name="hr"
          value={formData.hr}
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
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="塁打数"
          name="total_bases"
          value={formData.total_bases}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 0, max: 5000 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="打点"
          name="rbi"
          value={formData.rbi}
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
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="四死球"
          name="works"
          value={formData.works}
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
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="盗塁"
          name="steals"
          value={formData.steals}
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

export default BatterStatsForm;
