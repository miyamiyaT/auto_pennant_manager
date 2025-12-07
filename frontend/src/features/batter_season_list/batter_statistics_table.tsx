import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PlayerStatisticsTable = ({ players }) => {
  const [averageAge, setAverageAge] = useState(0);
  const [averageBattingAverage, setAverageBattingAverage] = useState(0);
  const [hrs, setHrs] = useState(0);
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
    let totalHits = 0;
    let totalAtBats = 0;
    let totalHrs = 0;
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
      const atBat = player.batter_season ? player.batter_season.at_bat || 0 : 0;
      const hits = player.batter_season ? player.batter_season.hits || 0 : 0;
      const hrs = player.batter_season ? player.batter_season.hr || 0 : 0;

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

      if (atBat > 0) {
        totalHits += hits;
        totalAtBats += atBat;
        totalHrs += hrs;
        count++;
      }
    });

    setAverageAge(totalAge / players.length);
    setAverageBattingAverage(totalHits / totalAtBats);
    setHrs(totalHrs);
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
            <TableCell>打率</TableCell>
            <TableCell>{averageBattingAverage.toFixed(3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ホームラン数</TableCell>
            <TableCell>{hrs}</TableCell>
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