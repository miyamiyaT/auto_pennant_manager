import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import BasicInfoForm from './basic_info_form';
import BatterStatsForm from './batter_stats_form';
import BatterAbilitiesForm from './batter_abilities_form';
import PositionCheckboxes from './position_check_box';
import { BatterRegisterData, createBatterRegisterData } from '../../models/batter_register_form';
import { mapBatterRegisterResponseToFormData } from './mapper';

const App = () => {
  const [formData, setFormData] = useState<BatterRegisterData>(() => createBatterRegisterData());
  const [playerDetails, setPlayerDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/batters/${id}/register`)
      .then(response => response.json())
      .then(data => {
        setFormData(mapBatterRegisterResponseToFormData(data))

        setPlayerDetails(data);
      })
      .catch(error => console.error("Fetching data failed", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
          <Grid item xs={4}>
            <FormControlLabel
              control={<Checkbox checked={formData.player.is_active} onChange={handleChange} name="active" />}
              label="現役選手"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>年齢: {calculatedStats.calculateAge}</Typography>
          </Grid>
          <br />
          <BasicInfoForm formData={formData} handleChange={handleChange} />
          <br />
          <PositionCheckboxes playerData={formData} handleChange={handleChange} />

          <BatterStatsForm formData={formData} handleChange={handleChange} />
          <br />
          <Box mt={2}>
            <Typography variant="h6">算出結果</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>打率: {calculatedStats.battingAverage}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>本塁打率: {calculatedStats.homeRunRate}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>長打率: {calculatedStats.sluggingPercentage}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>出塁率: {calculatedStats.onBasePercentage}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>OPS: {calculatedStats.ops}</Typography>
              </Grid>
            </Grid>
          </Box>
          <br />
          <BatterAbilitiesForm formData={formData} handleChange={handleChange} />
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
const toNumber = (value) => {
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
};

const createJsonData = (formData, stats, id) => {
  return {
    player: {
      id: id,
      is_active: formData.active
    },
    player_season: {
      year: formData.year,
      age: stats.calculateAge,
      memo: formData.seasonMemo,
      growth_type: formData.growthType,
      current_growth_type: formData.currentGrowthType,
      is_starter: formData.starter,
      is_relief: formData.relief,
      is_closer: formData.closer,
      is_catcher: formData.catcher,
      is_first: formData.first,
      is_second: formData.second,
      is_third: formData.third,
      is_short: formData.short,
      is_outfielder: formData.outfielder,
    },
    batter_season: {
      games: toNumber(formData.games),
      at_bat: toNumber(formData.atBats),
      hits: toNumber(formData.hits),
      works: toNumber(formData.works),
      hr: toNumber(formData.homeRuns),
      total_bases: toNumber(formData.totalBases),
      rbi: toNumber(formData.rbi),
      steals: toNumber(formData.steals),
      batting_average: stats.battingAverage,
      ab_hr: stats.homeRunRate,
      slg: stats.sluggingPercentage,
      oba: stats.onBasePercentage,
      ops: stats.ops
    },
    batter_ability: {
      trajectory: formData.trajectory,
      hit: formData.hit,
      power: formData.power,
      run_speed: formData.runSpeed,
      arm_strength: formData.armStrength,
      fielding: formData.fielding,
      catching: formData.catching,
      clutch_rank: formData.clutch_rank,
      vs_lhp_rank: formData.vs_lhp_rank,
      stealing_rank: formData.stealing_rank,
      running_rank: formData.running_rank,
      catcher_rank: formData.catcher_rank,
      throwing_rank: formData.throwing_rank,
      grit_rank: formData.grit_rank,
      recovery_rank: formData.recovery_rank,
      special_ability: formData.specialAbility,
    },

  };
};

export default App;
