import React from 'react';
import { Grid2, TextField, Button, Checkbox, MenuItem } from '@mui/material';
import { BreakingBall } from '../../models/breaking_ball';

const directionType = [
  { value: 0, label: '⬆️' },
  { value: 1, label: '→' },
  { value: 2, label: '↘️' },
  { value: 3, label: '↓' },
  { value: 4, label: '↙️' },
  { value: 5, label: '←' }
];

type BreakingBallFormProps = {
  formData: BreakingBall[];
  handleBreakingBallChange: <
    Key extends keyof BreakingBall
  >(
    index: number,
    key: Key,
    value: BreakingBall[Key]
  ) => void;

  breakingBallHandleAdd: () => void;
  breakingBallHandleRemove: (index: number) => void;
};

const BreakingBallForm: React.FC<BreakingBallFormProps> = ({ formData, handleBreakingBallChange, breakingBallHandleAdd, breakingBallHandleRemove }) => {
  return (
    <div>
      {formData.map((ball, index) => (
        <>
          <Grid2 container spacing={2} key={index} alignItems="center">
            <Grid2 size={{ xs: 3 }} >
              <TextField
                label="変化球名"
                value={ball.name}
                onChange={(e) => handleBreakingBallChange(index, 'name', e.target.value)}
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 2 }} >
              <TextField
                label="方向"
                select
                value={ball.direction}
                onChange={(e) => handleBreakingBallChange(index, 'direction', Number(e.target.value))}
                fullWidth
              >
                {directionType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 2 }} >
              <TextField
                type="number"
                label="変化量"
                value={ball.variation}
                onChange={(e) => handleBreakingBallChange(index, 'variation', Number(e.target.value))}
                fullWidth
                slotProps = {{ 
                  inputLabel: { shrink: true },
                  input:{
                    inputProps: { min: 0, max: 8 , step: 1, inputMode: 'numeric'}
                  }
                }}

              />
            </Grid2>
            <Grid2 size={{ xs: 2 }} >
              <Checkbox
                checked={ball.is_original}
                onChange={(e) => handleBreakingBallChange(index, 'is_original', e.target.checked)}
                color="primary"
              />
              オリジナル
            </Grid2>
            <Grid2 size={{ xs: 2 }} >
              <Button onClick={() => breakingBallHandleRemove(index)} variant="outlined">
                変化球削除
              </Button>
            </Grid2>
          </Grid2>
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
