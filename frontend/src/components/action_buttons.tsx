import React from 'react';
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  id: number
}

const ActionButtons = ({ id }: Props) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Button variant="contained" component={Link} to={`/player-registration-form/${id}/edit`}
        >選手編集</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" component={Link} to={`/batter-season-registration-form/${id}`}
        >打撃成績登録</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" component={Link} to={`/pitcher-season-registration-form/${id}`}
        >投球成績登録</Button>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;
