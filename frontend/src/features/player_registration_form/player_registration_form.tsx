import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Container, Typography, Box, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import PositionCheckboxes from './position_check_box';

interface PlayerData {
  team_id: number,
  name: string;
  birthday: string;
  memo: string;
  is_favorite: boolean,
  draft_year: number,
  draft_rank: number,
  draft_type: number,
  roy: boolean
}

interface PlayerSeasonData {
  year: number;
  number: string;
  is_starter: boolean;
  is_relief: boolean;
  is_closer: boolean;
  is_catcher: boolean;
  is_first: boolean;
  is_second: boolean;
  is_third: boolean;
  is_short: boolean;
  is_outfielder: boolean;
}

const draftType = [
  { value: '0', label: '高卒' },
  { value: '1', label: '大卒' },
  { value: '2', label: '社会人' },
  { value: '3', label: '独立' },
  { value: '4', label: 'その他' }
];

const PlayerRegistrationForm = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [playerData, setPlayerData] = useState<PlayerData>({
    team_id: id,
    name: '',
    birthday: '',
    memo: '',
    is_favorite: false,
    draft_year: 0,
    draft_rank: 0,
    draft_type: 0,
    roy: false
  });

  const [playerSeasonData, setPlayerSeasonData] = useState<PlayerSeasonData>({
    year: 0,
    number: '',
    is_starter: false,
    is_relief: false,
    is_closer: false,
    is_catcher: false,
    is_first: false,
    is_second: false,
    is_third: false,
    is_short: false,
    is_outfielder: false,
  });

  const [age, setAge] = useState<number | null>(null);

  const calculateAge = (birthday: string, year: number) => {
    const birthDate = new Date(birthday);
    const calculatedAge = year - birthDate.getFullYear();
    return calculatedAge;
  };

  useEffect(() => {
    if (playerData.birthday && playerSeasonData.year) {
      const calculatedAge = calculateAge(playerData.birthday, playerSeasonData.year);
      setAge(calculatedAge);
    }
  }, [playerData.birthday, playerSeasonData.year]);

  const handlePlayerDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setPlayerData({
      ...playerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePlayerSeasonDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setPlayerSeasonData({
      ...playerSeasonData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalData = {
      player: playerData,
      player_season: { ...playerSeasonData, age }
    };

    fetch('http://localhost:3000/api/v1/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('登録が完了しました！');
        navigation(-1);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          選手登録
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox checked={playerData.is_favorite} onChange={handlePlayerDataChange} name="is_favorite" />}
                label="お気に入り"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox checked={playerData.roy} onChange={handlePlayerDataChange} name="roy" />}
                label="新人王"
              />
            </Grid>
            {age !== null && (
              <Grid item xs={4}>
                <Typography>年齢: {age}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="名前"
                name="name"
                value={playerData.name}
                onChange={handlePlayerDataChange}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="birthday"
                value={playerData.birthday}
                onChange={handlePlayerDataChange}
                variant="filled"
                type="date"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="加入年"
                name="year"
                value={playerSeasonData.year}
                onChange={handlePlayerSeasonDataChange}
                variant="filled"
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="ドラフト年"
                name="draft_year"
                value={playerData.draft_year}
                onChange={handlePlayerDataChange}
                variant="filled"
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="ドラフト順位"
                name="draft_rank"
                value={playerData.draft_rank}
                onChange={handlePlayerDataChange}
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
                value={playerData.draft_type}
                onChange={handlePlayerDataChange}
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
              <Typography variant="h6" component="h2" gutterBottom>
                ポジション
              </Typography>
              <PositionCheckboxes playerData={playerSeasonData} handleChange={handlePlayerSeasonDataChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ドラフト時メモ"
                name="memo"
                value={playerData.memo}
                onChange={handlePlayerDataChange}
                variant="filled"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                登録
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default PlayerRegistrationForm;
