import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Paper, FormControlLabel, Checkbox, Grid2 } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import BatterStatsForm from './batter_stats_form';
import BatterAbilitiesForm from './batter_abilities_form';
import { mapBatterRegisterResponseToFormData } from './mapper';

import { BatterRegisterData, BatterRegisterFormData, createBatterRegisterData } from '../../models/batter_register_form';
import { BatterSeasonForm, buildBatterSeasonPayload } from '../../models/batter_season';
import { buildBatterAbilityPayload } from '../../models/batter_ability';
import { buildPlayerSeasonPayload } from '../../models/player_season';

import PlayerSeasonForm from '../../components/player_season_form';
import PositionCheckboxes from '../../components/position_check_box';

const App = () => {
  const [formData, setFormData] = useState<BatterRegisterData>(() => createBatterRegisterData());
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/batters/${id}/register`)
      .then(response => response.json())
      .then(data => {
        setFormData(mapBatterRegisterResponseToFormData(data));
      })
      .catch(error => console.error("Fetching data failed", error));
  }, [id]);

  const handlePlayerSeasonChange: React.ChangeEventHandler< HTMLInputElement | HTMLTextAreaElement > = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      player_season: {
        ...prev.player_season,
        [name]: value,
      },
    }));
  };

  const handlePositionCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      player_season: {
        ...prev.player_season,
        [name]: checked,
      },
    }));
  };

  const handleActiveChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        [name]: checked,
      },
    }));
  };

    const handleBatterSeasonChange: React.ChangeEventHandler< HTMLInputElement | HTMLTextAreaElement > = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      batter_season: {
        ...prev.batter_season,
        [name]: value,
      },
    }));
  };

  const handleBatterAbilityChange: React.ChangeEventHandler< HTMLInputElement | HTMLTextAreaElement > = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      batter_ability: {
        ...prev.batter_ability,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stats = calculateStats();
    const finalData = createJsonData(formData, stats, id);

    fetch(`http://localhost:3000/api/v1/batters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Successfully updated:', data);
        alert('登録が完了しました！');
        navigate(-1);
      })
      .catch(error => console.error('Error updating data:', error));
  };

  const calculateStats = () => {
    const birthdayStr = formData.player.birthday ?? '';
    const birthYear =  birthdayStr ? new Date(birthdayStr).getFullYear() : 0 ;
    const PlayerSeasonYear = Number(formData.player_season.year) || 0;
    const calculateAge = PlayerSeasonYear - birthYear;

    const hits = Number(formData.batter_season.hits) || 0;
    const atBat = Number(formData.batter_season.at_bat) || 0;
    const hr = Number(formData.batter_season.hr) || 0;
    const totalBases = Number(formData.batter_season.total_bases) || 0;
    const works = Number(formData.batter_season.works) || 0;

    const battingAverage = (hits / atBat).toFixed(3);
    const homeRunRate = (atBat / hr).toFixed(3);
    const sluggingPercentage = (totalBases / atBat).toFixed(3);
    const onBasePercentage = ((hits + works) / (atBat + works)).toFixed(3);
    const ops = (parseFloat(onBasePercentage) + parseFloat(sluggingPercentage)).toFixed(3);
    return {
      calculateAge: calculateAge == null ? '0' : calculateAge,
      battingAverage: battingAverage === 'NaN' ? '0.000' : battingAverage,
      homeRunRate: homeRunRate === 'NaN' || homeRunRate === 'Infinity' ? '0.000' : homeRunRate,
      sluggingPercentage: sluggingPercentage === 'NaN' ? '0.000' : sluggingPercentage,
      onBasePercentage: onBasePercentage === 'NaN' ? '0.000' : onBasePercentage,
      ops: ops === 'NaN' ? '0.000' : ops,
    };
  };

  const calculatedStats = calculateStats();

  return (
    <Container>
      <Box mt={5} component={Paper} p={3}>
        <Typography variant="h4" gutterBottom>
          選手登録フォーム: {formData.player.name}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 size={{ xs: 4 }}>
            <FormControlLabel
              control={<Checkbox checked={formData.player.is_active} onChange={handleActiveChange} name="active" />}
              label="現役選手"
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <Typography>年齢: {calculatedStats.calculateAge}</Typography>
          </Grid2>
          <br />
          <PlayerSeasonForm formData={formData.player_season} handleChange={handlePlayerSeasonChange} />
          <br />
          <PositionCheckboxes formData={formData.player_season} handleChange={handlePositionCheckboxChange} />

          <BatterStatsForm formData={formData.batter_season} handleChange={handleBatterSeasonChange} />
          <br />
          <Box mt={2}>
            <Typography variant="h6">算出結果</Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 4 }}>
                <Typography>打率: {calculatedStats.battingAverage}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>本塁打率: {calculatedStats.homeRunRate}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>長打率: {calculatedStats.sluggingPercentage}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>出塁率: {calculatedStats.onBasePercentage}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>OPS: {calculatedStats.ops}</Typography>
              </Grid2>
            </Grid2>
          </Box>
          <br />
          <BatterAbilitiesForm formData={formData.batter_ability} handleChange={handleBatterAbilityChange} />
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">
              登録
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};


const createJsonData = (formData: BatterRegisterFormData, stats: BatterSeasonForm, id: Number) => {
  return {
    player: {
      id: id,
      is_active: formData.player.is_active
    },
    player_season: buildPlayerSeasonPayload(formData.player_season),
    batter_season: buildBatterSeasonPayload(formData.batter_season, stats),
    batter_ability: buildBatterAbilityPayload(formData.batter_ability),
  };
};

export default App;
