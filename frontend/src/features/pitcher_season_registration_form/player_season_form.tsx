import React from 'react';
import { Grid2, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import { roundWithScale, grouthTypeDisplay, currentGrouthTypeDisplay } from '../../components/utils'; // utility functions
import { PlayerSeason } from '../../models/player_season';


const growthType = [
  { value: '', label: '不明' },
  { value: 'super_early', label: '超早熟' },
  { value: 'early', label: '早熟' },
  { value: 'normal', label: '普通' },
  { value: 'late', label: '晩成' },
  { value: 'super_late', label: '超晩成' }
];

const currentGrowthType = [
  { value: '', label: '不明' },
  { value: 'pre_growth', label: '成長期前' },
  { value: 'growth_phase', label: '成長期' },
  { value: 'prime', label: '全盛期' },
  { value: 'decline_phase', label: '衰退期' },
];


type PlayerSeasonFormProps = {
  formData: PlayerSeason;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const PlayerSeasonForm: React.FC<PlayerSeasonFormProps>  = ({ formData, handleChange }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 4 }} >
        <TextField
          type="number"
          label="年度"
          name="year"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 2024 ,max: 9999 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 4 }} >
        <TextField
          select
          label="成長タイプ"
          name="growth_type"
          value={formData.growth_type ?? ''} // nullish coalescing operatorでデフォルト値を設定
          onChange={handleChange}
          fullWidth
        >
          {growthType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 4 }} >
        <TextField
          select
          label="現成長タイプ"
          name="current_growth_type"
          value={formData.current_growth_type === null ? '' : formData.current_growth_type}
          onChange={handleChange}
          fullWidth
        >
          {currentGrowthType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          label="今シーズンのまとめメモ"
          name="memo"
          value={formData.memo}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
        />
      </Grid2>
    </Grid2>
  );
};

export default PlayerSeasonForm;
