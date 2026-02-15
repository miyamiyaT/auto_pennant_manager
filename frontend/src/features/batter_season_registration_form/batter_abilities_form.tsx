import React from 'react';
import { Grid2, TextField, MenuItem } from '@mui/material';
import { BatterAbility } from '../../models/batter_ability';

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

type BatterAbilityFormProps = {
  formData: BatterAbility;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const BatterAbilityForm: React.FC<BatterAbilityFormProps>  = ({ formData, handleChange }) => {  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="弾道"
          name="trajectory"
          value={formData.trajectory}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 4 , step: 1, inputMode: 'numeric'}
            }
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="ミート"
          name="hit"
          value={formData.hit}
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
          label="パワー"
          name="power"
          value={formData.power}
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
          label="走力"
          name="runSpeed"
          value={formData.run_speed}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 100 , step: 1, inputMode: 'numeric'}
            }
          }}        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="肩力"
          name="armStrength"
          value={formData.arm_strength}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 100 , step: 1, inputMode: 'numeric'}
            }
          }}        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="守備力"
          name="fielding"
          value={formData.fielding}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 100 , step: 1, inputMode: 'numeric'}
            }
          }}        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          type="number"
          label="捕球"
          name="catching"
          value={formData.catching}
          onChange={handleChange}
          fullWidth
          slotProps = {{ 
            inputLabel: { shrink: true },
            input:{
              inputProps: { min: 1, max: 100 , step: 1, inputMode: 'numeric'}
            }
          }}        />
      </Grid2>
      <Grid2 size={{ xs: 3 }}>

      </Grid2>
      <Grid2 size={{ xs: 3 }}>
        <TextField
          select
          label="チャンス"
          name="clutch"
          value={formData.clutch_rank ? formData.catcher_rank : "D"}
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
          label="対左"
          name="vsLhp"
          value={formData.vs_lhp_rank ? formData.vs_lhp_rank : "D"}
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
          label="キャッチャー"
          name="catcher_skill"
          value={formData.catcher_rank}
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
          name="grit"
          value={formData.grit_rank ? formData.grit_rank : "D"}
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
          label="盗塁"
          name="stealing"
          value={formData.stealing_rank ? formData.stealing_rank : "D"}
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
          label="走塁"
          name="running"
          value={formData.running_rank ? formData.running_rank : "D"}
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
          label="送球"
          name="throwing"
          value={formData.throwing_rank ? formData.throwing_rank : "D"}
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
          name="recovery"
          value={formData.recovery_rank ? formData.recovery_rank : "D"}
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
          name="specialAbility"
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

export default BatterAbilityForm;
