import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import BasicInfoForm from './basic_info_form';
import PitcherStatsForm from './pitcher_stats_form';
import PitcherAbilitiesForm from './pitcher_abilities_form';
import PositionCheckboxes from './position_check_box';
import BreakingBallForm from './breaking_ball_form';

const App = () => {
  const [formData, setFormData] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/pitchers/${id}?type=0`)
      .then(response => response.json())
      .then(data => {
        const PlayerData = data.player[0]
        const playerSeason = data.player[0].player_seasons[0];
        const pitcherSeason = playerSeason.pitcher_season || {};
        const pitcherAbility = playerSeason.pitcher_ability || {};
        const breakingBall = playerSeason.breaking_ball || [];

        setFormData({
          name: PlayerData.name || '',
          birthday: PlayerData.birthday || '',
          active: PlayerData.is_active || '',
          age: 0,
          year: playerSeason.year + 1 || '',
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
          games: pitcherSeason.games || '',
          innings: pitcherSeason.innings || '',
          thirds: pitcherSeason.thirds || '',
          wins: pitcherSeason.wins || '',
          loses: pitcherSeason.loses || '',
          saves: pitcherSeason.saves || '',
          holdPoints: pitcherSeason.hold_points || '',
          strikeouts: pitcherSeason.strikeouts || '',
          bb: pitcherSeason.bb || '',
          hitsAllowedNumbers: pitcherSeason.hits_allowed_numbers || '',
          earnedRuns: pitcherSeason.earned_runs || '',
          pitchVelocity: pitcherAbility.pitch_velocity || '',
          control: pitcherAbility.control || '',
          stamina: pitcherAbility.stamina || '',
          wRisp: pitcherAbility.w_risp || '',
          heather: pitcherAbility.heather || '',
          vsLbh: pitcherAbility.vs_lbh || '',
          agile: pitcherAbility.agile || '',
          poise: pitcherAbility.poise || '',
          grit: pitcherAbility.grit || '',
          recovery: pitcherAbility.recovery || '',
          specialAbility: pitcherAbility.special_ability || '',
          breakingBall: breakingBall.map(ball => ({
            name: ball.name || '',
            direction: ball.direction ?? '',
            variation: ball.variation || '',
            is_original: ball.is_original || false
          }))
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

  const breakingBallHandleChange = (index, field, value) => {
    const newBreakingBalls = [...formData.breakingBall];
    newBreakingBalls[index][field] = value;
    setFormData({ ...formData, breakingBall: newBreakingBalls });
  };

  const breakingBallHandleAdd = () => {
    if (formData.breakingBall.length < 10) {
      setFormData({
        ...formData,
        breakingBall: [...formData.breakingBall, { name: '', direction: '', variation: '', is_original: false }]
      });
    }
  };

  const breakingBallHandleRemove = (index) => {
    const newBreakingBalls = [...formData.breakingBall];
    newBreakingBalls.splice(index, 1);
    setFormData({ ...formData, breakingBall: newBreakingBalls });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stats = calculateStats();
    const finalData = createJsonData(formData, stats, id);

    fetch(`http://localhost:3000/api/v1/pitchers`, {
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
    const allInnings = Number(formData.innings) + (Number(formData.thirds) / 3) || 0;
    const earnedRuns = Number(formData.earnedRuns) || 0;
    const wins = Number(formData.wins) || 0;
    const loses = Number(formData.loses) || 0;
    const strikeouts = Number(formData.strikeouts) || 0;
    const bb = Number(formData.bb) || 0;
    const hitsAllowedNumbers = Number(formData.hitsAllowedNumbers) || 0;

    const birthYear = new Date(formData.birthday).getFullYear();
    const calculateAge = formData.year - birthYear;
    const era = ((earnedRuns * 9) / allInnings).toFixed(2);
    const winRate = (wins / (wins + loses)).toFixed(2);
    const k9 = ((strikeouts * 9) / allInnings).toFixed(2);
    const bb9 = ((bb / allInnings) * 9).toFixed(2);
    const kBb = (strikeouts / bb).toFixed(2);
    const whip = ((hitsAllowedNumbers + bb) / allInnings).toFixed(2);
    return {
      calculateAge: calculateAge === 'NaN' ? '0' : calculateAge,
      era: era === 'NaN' ? '0.00' : era,
      winRate: winRate === 'NaN' ? '0.00' : winRate,
      k9: k9 === 'NaN' ? '0.00' : k9,
      bb9: bb9 === 'NaN' ? '0.00' : bb9,
      kBb: kBb === 'NaN' ? '0.00' : kBb,
      whip: whip === 'NaN' ? '0.00' : whip,
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
          <br />
          <PitcherStatsForm formData={formData} handleChange={handleChange} />
          <br />
          <Box mt={2}>
            <Typography variant="h6">算出結果</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>防御率: {calculatedStats.era}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>勝率: {calculatedStats.winRate}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>奪三振率: {calculatedStats.k9}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>四死球率: {calculatedStats.bb9}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>K/BB: {calculatedStats.kBb}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>whip: {calculatedStats.whip}</Typography>
              </Grid>
            </Grid>
          </Box>
          <br />
          <PitcherAbilitiesForm formData={formData} handleChange={handleChange} />
          <br />
          <BreakingBallForm formData={formData.breakingBall}
            breakingBallHandleChange={breakingBallHandleChange}
            breakingBallHandleAdd={breakingBallHandleAdd}
            breakingBallHandleRemove={breakingBallHandleRemove} />
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
    pitcher_season: {
      games: toNumber(formData.games),
      innings: toNumber(formData.innings),
      thirds: toNumber(formData.thirds),
      wins: toNumber(formData.wins),
      loses: toNumber(formData.loses),
      saves: toNumber(formData.saves),
      steals: toNumber(formData.steals),
      hold_points: toNumber(formData.holdPoints),
      strikeouts: toNumber(formData.strikeouts),
      bb: toNumber(formData.bb),
      hits_allowed_numbers: toNumber(formData.hitsAllowedNumbers),
      earned_runs: toNumber(formData.earnedRuns),
      win_rate: stats.winRate,
      era: stats.era,
      k9: stats.k9,
      bb9: stats.bb9,
      k_bb: stats.kBb,
      whip: stats.whip
    },
    pitcher_ability: {
      pitch_velocity: formData.pitchVelocity,
      control: formData.control,
      stamina: formData.stamina,
      w_risp: formData.wRisp,
      heather: formData.heather,
      vs_lbh: formData.vsLbh,
      catching: formData.catching,
      clutch: formData.clutch,
      vs_lhp: formData.vsLhp,
      agile: formData.agile,
      poise: formData.poise,
      grit: formData.grit,
      recovery: formData.recovery,
      special_ability: formData.specialAbility,
    },
    breaking_ball: formData.breakingBall

  };
};

export default App;