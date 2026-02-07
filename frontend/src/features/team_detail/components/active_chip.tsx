import { Chip } from '@mui/material';

const ACTIVE_COLOR = '#5CB8A6';
const INACTIVE_COLOR = '#9e9e9e';

export const ActiveChip = ({ isActive }: { isActive: boolean }) => (
  <Chip
    label={isActive ? '現役' : '退団'}
    size="small"
    sx={{
      bgcolor: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
      color: '#fff',
    }}
  />
);


export default ActiveChip;
