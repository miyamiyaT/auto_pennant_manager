import React, { useEffect, useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox, Grid, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import PlayerTableContent from './player_result_table_content';
import PlayerStatisticsTable from './pitcher_statistics_table';

const PlayersList = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [positionsToFetch, setPositionsToFetch] = useState([]);


  useEffect(() => {
    // 初回リクエストで最新の年度と全ての年度を取得
    fetch(`http://localhost:3000/api/v1/pitcher_seasons/${id}/years`)
      .then(response => response.json())
      .then(data => {
        setYears(data.years);
        setSelectedYear(data.latest_year);
        return fetchPlayers(data.latest_year);
      });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchPlayers(selectedYear);
    }
  }, [positionsToFetch, selectedYear]);

  const fetchPlayers = (year) => {
    const queryParams = new URLSearchParams();
    queryParams.append('year', year);
    if (positionsToFetch.length > 0) {
      queryParams.append('positions', positionsToFetch.join(','));
    }

    fetch(`http://localhost:3000/api/v1/pitcher_seasons/${id}?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => setPlayers(data.players))
      .catch(error => console.error('Error fetching players:', error));
  };


  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    fetchPlayers(year);
  };

  const handlePositionChange = (event) => {
    const position = event.target.name;
    setSelectedPositions(prev =>
      prev.includes(position) ? prev.filter(p => p !== position) : [...prev, position]
    );
  };

  const handleSearch = () => {
    setPositionsToFetch(selectedPositions); // 検索時に使用するポジションをセット
    fetchPlayers(selectedYear); // 検索ボタンを押したときにリクエストを送信
  };

  const playersCount = players.length;

  const positionLabels = {
    'Starter': '先発',
    'Relief': '中継',
    'Closer': '抑え'
  };


  return (
    <div>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <PlayerStatisticsTable players={players} />

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              sx={{ minWidth: 60 }} // サイズを大きくするためのスタイル
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <FormGroup row>
            {['Starter', 'Relief', 'Closer'].map(position => (
              <FormControlLabel
                key={position}
                control={
                  <Checkbox
                    checked={selectedPositions.includes(position)}
                    onChange={handlePositionChange}
                    name={position}
                  />
                }
                label={positionLabels[position]}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ marginTop: 2 }}
            >
              検索
            </Button>
          </FormGroup>
          <Grid item>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              {`対象選手: ${playersCount}人`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <PlayerTableContent player={players} />
    </div>
  );
};

export default PlayersList;