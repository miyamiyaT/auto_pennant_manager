import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Grid, Container, Typography, Box, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

const PlayerRegistrationEditForm = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState();

  const draftType = [
  { value: '0', label: '高卒' },
  { value: '1', label: '大卒' },
  { value: '2', label: '社会人' },
  { value: '3', label: '独立' },
  { value: '4', label: 'その他' }
];

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/players/${id}`)
      .then(response => response.json())
      .then(data => setPlayer(data))
      .catch(error => console.error("Fetching data failed", error));
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlayer({
      ...player,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(`http://localhost:3000/api/v1/players/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player: player }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('登録が完了しました！');
        // 必要に応じて成功時の処理をここに追加
        navigation(-1)
      })
      .catch((error) => {
        console.error('Error:', error);
        // 必要に応じてエラー時の処理をここに追加
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          選手編集
        </Typography>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked={player.is_favorite} onChange={handleChange} name="is_favorite" />}
            label="お気に入り"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked={player.roy} onChange={handleChange} name="roy" />}
            label="新人王"
          />
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="名前"
                name="name"
                value={player.name}
                onChange={handleChange}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="birthday"
                value={player.birthday}
                onChange={handleChange}
                variant="filled"
                type="date"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="ドラフト年"
                name="draft_year"
                value={player.draft_year}
                onChange={handleChange}
                variant="filled"
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="ドラフト順位"
                name="draft_rank"
                value={player.draft_rank}
                onChange={handleChange}
                variant="filled"
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                label="卒歴"
                name="draft_type"
                value={player.draft_type}
                onChange={handleChange}
                variant="filled"
              >
                {draftType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ドラフト時メモ"
                name="memo"
                value={player.memo}
                onChange={handleChange}
                variant="filled"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                更新
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default PlayerRegistrationEditForm;

