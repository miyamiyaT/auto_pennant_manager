import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import { roundWithScale, grouthTypeDisplay, currentGrouthTypeDisplay } from '../../components/utils'; // utility functions


const growthType = [
  { value: '', label: '不明' },
  { value: 0, label: '超早熟' },
  { value: 1, label: '早熟' },
  { value: 2, label: '普通' },
  { value: 3, label: '晩成' },
  { value: 4, label: '超晩成' }
];

const currentGrowthType = [
  { value: '', label: '不明' },
  { value: 0, label: '成長期前' },
  { value: 1, label: '成長期' },
  { value: 2, label: '全盛期' },
  { value: 3, label: '衰退期' },
];


const BasicInfoForm = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          type="number"
          label="年度"
          name="year"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 2024, max: 9999 }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          select
          label="成長タイプ"
          name="growthType"
          value={formData.growthType ?? ''} // nullish coalescing operatorでデフォルト値を設定
          onChange={handleChange}
          fullWidth
        >
          {growthType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          select
          label="現成長タイプ"
          name="currentGrowthType"
          value={formData.currentGrowthType === null ? '' : formData.currentGrowthType}
          onChange={handleChange}
          fullWidth
        >
          {currentGrowthType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="今シーズンのまとめメモ"
          name="seasonMemo"
          value={formData.seasonMemo}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
        />
      </Grid>
    </Grid>
  );
};

export default BasicInfoForm;
