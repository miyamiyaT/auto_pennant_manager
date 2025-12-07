import React from 'react';
import { Grid, TextField, Button, Checkbox, MenuItem } from '@mui/material';

const directionType = [
  { value: "0", label: '⬆️' },
  { value: 1, label: '→' },
  { value: 2, label: '↘️' },
  { value: 3, label: '↓' },
  { value: 4, label: '↙️' },
  { value: 5, label: '←' }
];


const BreakingBallForm = ({ formData, breakingBallHandleChange, breakingBallHandleAdd, breakingBallHandleRemove }) => {
  return (
    <div>
      {formData.map((ball, index) => (
        <>
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={3}>
              <TextField
                label="変化球名"
                value={ball.name}
                onChange={(e) => breakingBallHandleChange(index, 'name', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="方向"
                select
                value={ball.direction ?? ""}
                onChange={(e) => breakingBallHandleChange(index, 'direction', e.target.value)}
                fullWidth
              >
                {directionType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                label="変化量"
                value={ball.variation}
                onChange={(e) => breakingBallHandleChange(index, 'variation', e.target.value)}
                fullWidth
                inputProps={{ min: 0, max: 8 }}

              />
            </Grid>
            <Grid item xs={2}>
              <Checkbox
                checked={ball.is_original}
                onChange={(e) => breakingBallHandleChange(index, 'is_original', e.target.checked)}
                color="primary"
              />
              オリジナル
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => breakingBallHandleRemove(index)} variant="outlined">
                変化球削除
              </Button>
            </Grid>
          </Grid>
          <br />
        </>
      ))}
      <br />
      {formData.length < 10 && (
        <Button onClick={breakingBallHandleAdd} variant="outlined">
          変化球追加
        </Button>
      )}
    </div>
  );
};

export default BreakingBallForm;
