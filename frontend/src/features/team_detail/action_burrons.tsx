import React from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom';

interface Props {
  id: string
}

const ActionButtons = ({ id }: Props) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Button variant="contained" component={Link} to={`/player-registration-form/${id}`}
        >選手登録</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" component={Link} to={`/batter-season-list/${id}`}
        >野手シーズン記録一覧へ</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" component={Link} to={`/pitcher-season-list/${id}`}
        >投手シーズン記録一覧へ</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" component={Link} to={`/team-season/${id}`}
        >チームシーズン記録一覧へ</Button>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;
