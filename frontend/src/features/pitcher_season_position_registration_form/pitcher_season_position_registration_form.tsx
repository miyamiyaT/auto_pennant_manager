import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import BasicInfoForm from './basic_info_form';
import BatterStatsForm from './batter_stats_form';
import BatterAbilitiesForm from './batter_abilities_form';
import PositionCheckboxes from './position_check_box';

const App = () => {
  const [formData, setFormData] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/batters/${id}?type=0`)
      .then(response => response.json())
      .then(data => {
        const PlayerData = data.player[0]
        const playerSeason = data.player[0].player_seasons[0];
        const batterSeason = playerSeason.batter_season || {};
        const batterAbility = playerSeason.batter_ability || {};

        setFormData({
          name: PlayerData.name || '',
          birthday: PlayerData.birthday || '',
          active: PlayerData.is_active || '',
          age: 0,
          year: playerSeason.year || '',
          growthType: playerSeason.growth_type,
          currentGrowthType: playerSeason.current_growth_type,
          starter: playerSeason.is_starter,
          relief: playerSeason.is_relief,
          closer: playerSeason.is_closer,
          catcher: playerSeason.is_catcher,
          first: playerSeason.is_first,
          second: playerSeason.is_second,
          third: playerSeason.is_third,
          short: playerSeason.is_short,
          outfielder: playerSeason.is_outfielder,
          seasonMemo: playerSeason.memo || '',
          games: batterSeason.games || '',
          atBats: batterSeason.at_bat || '',
          hits: batterSeason.hits || '',
          homeRuns: batterSeason.hr || '',
          totalBases: batterSeason.total_bases || '',
          works: batterSeason.works || '',
          rbi: batterSeason.rbi || '',
          steals: batterSeason.steals || '',
          trajectory: batterAbility.trajectory || '',
          hit: batterAbility.hit || '',
          power: batterAbility.power || '',
          runSpeed: batterAbility.run_speed || '',
          armStrength: batterAbility.arm_strength || '',
          fielding: batterAbility.fielding || '',
          catching: batterAbility.catching || '',
          clutch: batterAbility.clutch || '',
          vsLhp: batterAbility.vs_lhp || '',
          stealing: batterAbility.stearing || '',
          running: batterAbility.runnning || '',
          catcher_skill: batterAbility.catcher || '',
          grit: batterAbility.grit || '',
          recovery: batterAbility.recovery || '',
          throwing: batterAbility.throwing || '',
          specialAbility: batterAbility.special_ability || '',
        });

        setPlayerDetails(data);
      })
      .catch(error => console.error("Fetching data failed", error));
  }, [id]);

  if (!formData) {
    return <div>Loading...</div>;
  }

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
    // const calculateAge = 
    const birthYear = new Date(formData.birthday).getFullYear();
    const calculateAge = formData.year - birthYear;
    const battingAverage = (formData.hits / formData.atBats).toFixed(3);
    const homeRunRate = (formData.atBats / formData.homeRuns).toFixed(3);
    const sluggingPercentage = (formData.totalBases / formData.atBats).toFixed(3);
    const onBasePercentage = ((parseInt(formData.hits) + parseInt(formData.works)) / (parseInt(formData.atBats) + parseInt(formData.works))).toFixed(3);
    const ops = (parseFloat(onBasePercentage) + parseFloat(sluggingPercentage)).toFixed(3);
    return {
      calculateAge: calculateAge === 'NaN' ? '0' : calculateAge,
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
          選手登録フォーム: {formData.name}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Checkbox checked={formData.active} onChange={handleChange} name="active" />}
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
      clutch: formData.clutch,
      vs_lhp: formData.vsLhp,
      stearing: formData.stealing,
      runnning: formData.running,
      catcher: formData.catcher_skill,
      throwing: formData.throwing,
      grit: formData.grit,
      recovery: formData.recovery,
      special_ability: formData.specialAbility,
    },

  };
};

export default App;
