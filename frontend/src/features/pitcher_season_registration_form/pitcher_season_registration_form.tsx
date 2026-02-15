import React, { useState, useEffect } from 'react';
import { createPitcherRegisterData, PitcherRegisterData, PitcherRegisterFormData } from '../../models/pitcher_register_form';
import { buildPitcherAbilityPayload } from '../../models/pitcher_ability';

import { mapPitcherRegisterResponseToFormData } from './mapper';

import { Container, Box, Typography, Button, Grid, Paper, FormControlLabel, Checkbox, Grid2 } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';


import PitcherStatsForm from './pitcher_stats_form';
import PitcherAbilitiesForm from './pitcher_abilities_form';
import PositionCheckboxes from '../../components/position_check_box';
import BreakingBallForm from './breaking_ball_form';
import { BreakingBall } from '../../models/breaking_ball';
import { buildPlayerSeasonPayload } from '../../models/player_season';
import { buildPitcherSeasonPayload, PitcherSeasonForm } from '../../models/pitcher_season';
import PlayerSeasonForm from '../../components/player_season_form';

const App = () => {
  const [formData, setFormData] = useState<PitcherRegisterData>(() => createPitcherRegisterData());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/pitchers/${id}/register`)
      .then(response => response.json())
      .then((data) => {
        setFormData(mapPitcherRegisterResponseToFormData(data));
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


const handlePositionCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

    const handlePitcherSeasonChange: React.ChangeEventHandler< HTMLInputElement | HTMLTextAreaElement > = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      pitcher_season: {
        ...prev.pitcher_season,
        [name]: value,
      },
    }));
  };

  const handlePitcherAbilityChange: React.ChangeEventHandler< HTMLInputElement | HTMLTextAreaElement > = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      pitcher_ability: {
        ...prev.pitcher_ability,
        [name]: value,
      },
    }));
  };

  // 変化球の変更handle
  const handleBreakingBallChange = (
    index: number,
    key: keyof BreakingBall,
    value: BreakingBall[keyof BreakingBall]
  ) => {
    setFormData(prev => {
      const next = [...prev.breaking_ball];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, breaking_ball: next };
    });
  };

  const breakingBallHandleAdd = () => {
    if (formData.breaking_ball.length < 10) {
      setFormData({
        ...formData,
        breaking_ball: [...formData.breaking_ball, { name: '', direction: 0, variation: 0, is_original: false }]
      });
    }
  };

  const breakingBallHandleRemove = (index) => {
    const newBreakingBalls = [...formData.breaking_ball];
    newBreakingBalls.splice(index, 1);
    setFormData({ ...formData, breaking_ball: newBreakingBalls });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const stats = calculateStats();
    const finalData = createJsonData(formData, stats, id);

    console.log(finalData)
    // fetch(`http://localhost:3000/api/v1/pitchers`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(finalData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Successfully updated:', data);
    //     alert('登録が完了しました！');
    //     navigate(-1);
    //   })
    //   .catch(error => console.error('Error updating data:', error));
  };

  const calculateStats = () => {
    const allInnings = Number(formData.pitcher_season.innings) + (Number(formData.pitcher_season.thirds) / 3) || 0;
    const earnedRuns = Number(formData.pitcher_season.earned_runs) || 0;
    const wins = Number(formData.pitcher_season.wins) || 0;
    const loses = Number(formData.pitcher_season.loses) || 0;
    const strikeouts = Number(formData.pitcher_season.strikeouts) || 0;
    const bb = Number(formData.pitcher_season.bb) || 0;
    const hitsAllowedNumbers = Number(formData.pitcher_season.hits_allowed_numbers) || 0;
    const PlayerSeasonYear = Number(formData.player_season.year) || 0;
    const birthdayStr = formData.player.birthday ?? '';

    const birthYear =  birthdayStr ? new Date(birthdayStr).getFullYear() : 0 ;
    const calculateAge = PlayerSeasonYear - birthYear;
    const era = ((earnedRuns * 9) / allInnings).toFixed(2);
    const winRate = (wins / (wins + loses)).toFixed(2);
    const k9 = ((strikeouts * 9) / allInnings).toFixed(2);
    const bb9 = ((bb / allInnings) * 9).toFixed(2);
    const kBb = (strikeouts / bb).toFixed(2);
    const whip = ((hitsAllowedNumbers + bb) / allInnings).toFixed(2);
    return {
      calculateAge: calculateAge,
      era: era === 'NaN' ? '0.00' : era,
      winRate: winRate === 'NaN' ? '0.00' : winRate,
      k9: k9 === 'NaN' ? '0.00' : k9,
      bb9: bb9 === 'NaN' ? '0.00' : bb9,
      kBb: kBb === 'NaN' ? '0.00' : kBb,
      whip: whip === 'NaN' ? '0.00' : whip,
    };
  };
console.log(formData)
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
              control={<Checkbox checked={formData.player.is_active} onChange={handleActiveChange} name="is_active" />}
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
          <br />
          <PitcherStatsForm formData={formData.pitcher_season} handleChange={handlePitcherSeasonChange} />
          <br />
          <Box mt={2}>
            <Typography variant="h6">算出結果</Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 4 }}>
                <Typography>防御率: {calculatedStats.era}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>勝率: {calculatedStats.winRate}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>奪三振率: {calculatedStats.k9}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>四死球率: {calculatedStats.bb9}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>K/BB: {calculatedStats.kBb}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Typography>whip: {calculatedStats.whip}</Typography>
              </Grid2>
            </Grid2>
          </Box>
          <br />
          <PitcherAbilitiesForm formData={formData.pitcher_ability} handleChange={handlePitcherAbilityChange} />
          <br />
          <BreakingBallForm formData={formData.breaking_ball}
            handleBreakingBallChange={handleBreakingBallChange}
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

const createJsonData = (formData: PitcherRegisterFormData, stats: PitcherSeasonForm, id: Number) => {
  return {
    player: {
      id: id,
      is_active: formData.player.is_active
    },
    player_season: buildPlayerSeasonPayload(formData.player_season),
    pitcher_season: buildPitcherSeasonPayload(formData.pitcher_season, stats),
    pitcher_ability: buildPitcherAbilityPayload(formData.pitcher_ability),
    breaking_ball: formData.breaking_ball

  };
};

export default App;