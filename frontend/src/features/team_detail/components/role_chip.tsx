import { Chip } from '@mui/material';

const BATTER_COLOR = '#4FA8E6';
const PITCHER_COLOR = '#E66A6A';

export const RoleChip = ({ isBatter, isPitcher }: {
  isBatter: boolean;
  isPitcher: boolean;
}) => {
  if (isBatter) return <Chip label="打" size="small" sx={{ bgcolor: BATTER_COLOR, color: '#fff'}} />;
  if (isPitcher) return <Chip label="投" size="small" sx={{ bgcolor: PITCHER_COLOR, color: '#fff'}} />;
  return null;
};

export default RoleChip;
