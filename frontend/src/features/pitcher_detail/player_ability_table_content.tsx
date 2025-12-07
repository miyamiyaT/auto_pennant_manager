import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import clsx from 'clsx';


const columns: GridColDef[] = [
  {
    field: "year",
    headerName: "年度",
    width: 60,
    renderCell: (player) => player.row.year, // 連想配列から値を取り出す
    sortable: true, // ソートを可能にする
  },
  {
    field: "age",
    headerName: "年齢",
    width: 50,
    renderCell: (player) => player.row.age, // 連想配列から値を取り出す
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        high: params.value >= 31,
        mid: params.value <= 30 &&  params.value >= 27,
        mod: params.value <= 26 &&  params.value >= 23,
        low: params.value <= 22
      });
    },
    sortable: true, // ソートを可能にする
  },
  {
    field: "pitch_velocity",
    headerName: "球速",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.pitch_velocity : 0 },
    renderCell: (player) => { { return player.row.pitcher_ability ? player.row.pitcher_ability.pitch_velocity : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        s_rank: params.value >= 160,
        a_rank: params.value <= 159 &&  params.value >= 155,
        b_rank: params.value <= 154 &&  params.value >= 150,
        c_rank: params.value <= 149 &&  params.value >= 145,
        d_rank: params.value <= 144 &&  params.value >= 140,
        e_rank: params.value <= 139 &&  params.value >= 135,
        f_rank: params.value <= 134 &&  params.value >= 130,
        g_rank: params.value <= 129
      });
    },
  },
  {
    field: "control",
    headerName: "制球",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.control : 0 },
    renderCell: (player) => { { return player.row.pitcher_ability ? player.row.pitcher_ability.control : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        s_rank: params.value >= 90,
        a_rank: params.value <= 89 &&  params.value >= 80,
        b_rank: params.value <= 79 &&  params.value >= 70,
        c_rank: params.value <= 69 &&  params.value >= 60,
        d_rank: params.value <= 59 &&  params.value >= 50,
        e_rank: params.value <= 49 &&  params.value >= 40,
        f_rank: params.value <= 39 &&  params.value >= 20,
        g_rank: params.value <= 19
      });
    },
  },
  {
    field: "stamina",
    headerName: "スタ",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.stamina : 0 },
    renderCell: (player) => { { return player.row.pitcher_ability ? player.row.pitcher_ability.stamina : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        s_rank: params.value >= 90,
        a_rank: params.value <= 89 &&  params.value >= 80,
        b_rank: params.value <= 79 &&  params.value >= 70,
        c_rank: params.value <= 69 &&  params.value >= 60,
        d_rank: params.value <= 59 &&  params.value >= 50,
        e_rank: params.value <= 49 &&  params.value >= 40,
        f_rank: params.value <= 39 &&  params.value >= 20,
        g_rank: params.value <= 19
      });
    },
  },
  {
    field: "batting_ability1",
    headerName: "特能1",
    width: 75,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.w_risp : 0 },
    renderCell: (player) => {
      return player.row.pitcher_ability ?
    <div>
      <div>対ピ:{player.row.pitcher_ability.w_risp}</div>
      <div>ノビ:{player.row.pitcher_ability.heather}</div>
      <div>対左:{player.row.pitcher_ability.vs_lbh}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "batting_ability2",
    headerName: "特能2",
    width: 75,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.w_risp : 0 },
    renderCell: (player) => {
      return player.row.pitcher_ability ?
    <div>
      <div>クイ:{player.row.pitcher_ability.agile}</div>
      <div>打た:{player.row.pitcher_ability.poise}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "batting_ability3",
    headerName: "特能3",
    width: 75,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.w_risp : 0 },
    renderCell: (player) => {
      return player.row.pitcher_ability ?
    <div>
      <div>ケガ:{player.row.pitcher_ability.grit}</div>
      <div>回復:{player.row.pitcher_ability.recovery}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "breaking_ball",
    headerName: "変化球",
    width: 175,
    valueGetter: (player,row) => { return row.breaking_ball && row.breaking_ball.length > 0 ? row.pitcher_ability.breaking_ball : 0 },
    renderCell: (player) => {
      return player.row.breaking_ball && player.row.breaking_ball.length > 0 ?
      <div>
        {player.row.breaking_ball.map((ball, index) => (
          <div key={index}>{ball.name}: {ball.variation}</div>
        ))}
      </div>
       : '-'
     },
  },
  {
    field: "special_ability",
    headerName: "特殊能力",
    width: 250,
    valueGetter: (player,row) => { return row.pitcher_ability ? row.pitcher_ability.special_ability : 0 },
    renderCell: (player) => {
      return player.row.pitcher_ability ?
    <div>
      {player.row.pitcher_ability.special_ability}
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  }
];


const PlayerAbilityTableContent = ({ player }) => {
  return (
        <>
          <Box
            sx={{
              width: '100%',
              '& .super-app.high': {
                backgroundColor: '#FCDBD7',
                color: '#1a3e72'
              },
              '& .super-app.mid': {
                backgroundColor: '#DBD7FC',
                color: '#1a3e72'
              },
              '& .super-app.mod': {
                backgroundColor: '#D7E6FC',
                color: '#1a3e72'
              },
              '& .super-app.low': {
                backgroundColor: '#D7FCDB',
                color: '#1a3e72'
              },
              '& .super-app.s_rank': {
                backgroundColor: '#FDA1FF',
                color: '#1a3e72'
              },
              '& .super-app.a_rank': {
                backgroundColor: '#FF7DC0',
                color: '#1a3e72'
              },
              '& .super-app.b_rank': {
                backgroundColor: '#F89489',
                color: '#1a3e72'
              },
              '& .super-app.c_rank': {
                backgroundColor: '#FFE6CC',
                color: '#1a3e72'
              },
              '& .super-app.d_rank': {
                backgroundColor: '#FFFF66',
                color: '#1a3e72'
              },
              '& .super-app.e_rank': {
                backgroundColor: '#CCFFCC',
                color: '#1a3e72'
              },
              '& .super-app.f_rank': {
                backgroundColor: '#CBD4F7',
                color: '#1a3e72'
              },
              '& .super-app.g_rank': {
                backgroundColor: '#C1C1C1',
                color: '#1a3e72'
              }
            }}
          >
            <DataGrid
            getRowHeight={() => 'auto'}
            rows={player}
            columns={columns}
            initialState={{
              density: 'compact',
            }}
            />
          </Box>
        </>
    // <TableContainer component={Paper} style={{ maxHeight: 800 }}>
      /* <Table stickyHeader>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>年度</TableCell>
            <TableCell>年齢</TableCell>
            <TableCell>球速</TableCell>
            <TableCell>制球</TableCell>
            <TableCell>スタ</TableCell>
            <TableCell>対ピ</TableCell>
            <TableCell>ノビ</TableCell>
            <TableCell>対左</TableCell>
            <TableCell>クイ</TableCell>
            <TableCell>打た</TableCell>
            <TableCell>ケガ</TableCell>
            <TableCell>回復</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {player.player_seasons.map(season => (
            <>
              <TableRow key={season.year}>
                <TableCell>{season.year}</TableCell>
                <TableCell>{season.age}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.pitch_velocity : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.control : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.stamina : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.w_risp : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.heather : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.vs_lbh : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.agile : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.poise : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.grit : null}</TableCell>
                <TableCell>{season.pitcher_ability ? season.pitcher_ability.recovery : null}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={14}>
                  変化球: {season.breaking_ball && season.breaking_ball.length > 0 && (
                    <>
                      {season.breaking_ball
                        .map(ability => `${directionTypeDisplay(ability.direction)}${ability.variation}: ${ability.name}`)
                        .join(', ')
                      }
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={14}>
                  特殊能力: {season.pitcher_ability ? season.pitcher_ability.special_ability : null}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={14}>
                  ポジション: {extractTruePositions(season).join(', ')}&nbsp;&nbsp;
                  防御率: {season.pitcher_season ? formatIndicator(season.pitcher_season.era) : null}&nbsp;
                  登板: {season.pitcher_season ? season.pitcher_season.games : null}&nbsp;
                  勝: {season.pitcher_season ? season.pitcher_season.wins : null}&nbsp;
                  負: {season.pitcher_season ? season.pitcher_season.loses : null}&nbsp;
                  H: {season.pitcher_season ? season.pitcher_season.hold_points : null}&nbsp;
                  S: {season.pitcher_season ? season.pitcher_season.saves : null}&nbsp;
                  K: {season.pitcher_season ? season.pitcher_season.strikeouts : null}&nbsp;
                  whip: {season.pitcher_season ? formatIndicator(season.pitcher_season.whip) : null}&nbsp;
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody >
      </Table> */
    // </TableContainer>
  );
};

export default PlayerAbilityTableContent;
