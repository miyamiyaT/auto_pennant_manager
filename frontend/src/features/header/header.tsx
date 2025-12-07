import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ペナント選手管理ツール
          </Typography>
          <Button variant="contained" component={Link} to={`/team-list`}
          >チーム一覧</Button>
        </Toolbar>
      </AppBar>
      <br />
      <br />

    </Box>
  );
};

export default Header;
