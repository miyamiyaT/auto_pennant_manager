import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PlayerStatisticsTable = ({ players }) => {
  const [averageAge, setAverageAge] = useState(0);
  const [era, setEra] = useState(0);
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [strikeouts, setStrikeouts] = useState(0);
  const [k9, setK9] = useState(0);

  const [ageGroups, setAgeGroups] = useState({
    '18-21': 0,
    '21-24': 0,
    '24-27': 0,
    '27-30': 0,
    '30+': 0,
  });

  useEffect(() => {
    calculateStatistics(players);
  }, [players]);

  const calculateStatistics = (players) => {
    let totalAge = 0;
    let totalInnings = 0;
    let totalThirds = 0;
    let totalEarnedRuns = 0;
    let totalWins = 0;
    let totalLoses = 0;
    let totalStrikeouts = 0;
    let count = 0;
    const ageGroupCount = {
      '18-21歳': 0,
      '21-24歳': 0,
      '24-27歳': 0,
      '27-30歳': 0,
      '31歳以上': 0,
    };

    players.forEach(player => {
      const age = player.player_season ? player.player_season.age || 0 : 0;
      const innings = player.pitcher_season ? player.pitcher_season.innings || 0 : 0;
      const thirds = player.pitcher_season ? player.pitcher_season.thirds || 0 : 0;
      const earnedRuns = player.pitcher_season ? player.pitcher_season.earned_runs || 0 : 0;
      const wins = player.pitcher_season ? player.pitcher_season.wins || 0 : 0;
      const loses = player.pitcher_season ? player.pitcher_season.loses || 0 : 0;
      const strikeouts = player.pitcher_season ? player.pitcher_season.strikeouts || 0 : 0;

      if (age) {
        totalAge += age;

        if (age >= 18 && age <= 21) {
          ageGroupCount['18-21歳'] += 1;
        } else if (age >= 21 && age < 24) {
          ageGroupCount['21-24歳'] += 1;
        } else if (age >= 24 && age < 27) {
          ageGroupCount['24-27歳'] += 1;
        } else if (age >= 27 && age < 30) {
          ageGroupCount['27-30歳'] += 1;
        } else if (age >= 30) {
          ageGroupCount['31歳以上'] += 1;
        }
      }

      if (innings > 0 || thirds > 0) {
        totalInnings += innings;
        totalThirds += thirds;
        totalEarnedRuns += earnedRuns;
        totalWins += wins;
        totalLoses += loses;
        totalStrikeouts += strikeouts;
        count++;
      }
    });

    setAverageAge(totalAge / players.length);
    setEra((totalEarnedRuns * 9) / (totalInnings + (totalThirds / 3)));
    setWins(totalWins);
    setLoses(totalLoses);
    setStrikeouts(totalStrikeouts);
    setK9((totalStrikeouts / (totalInnings + (totalThirds / 3))) * 9);
    setAgeGroups(ageGroupCount);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Statistic</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>平均防御率</TableCell>
            <TableCell>{era.toFixed(3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>勝利数</TableCell>
            <TableCell>{wins}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>敗北数</TableCell>
            <TableCell>{loses}</TableCell>
          </TableRow>
            <TableRow>
            <TableCell>奪三振</TableCell>
            <TableCell>{strikeouts}</TableCell>
          </TableRow>
                    <TableRow>
            <TableCell>奪三振率</TableCell>
            <TableCell>{k9.toFixed(3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>平均年齢</TableCell>
            <TableCell>{averageAge.toFixed(2)}</TableCell>
          </TableRow>
          {Object.entries(ageGroups).map(([ageRange, count]) => (
            <TableRow key={ageRange}>
              <TableCell>{`${ageRange}`}</TableCell>
              <TableCell>{`${count} 人`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
};

export default PlayerStatisticsTable;