import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { formatIndicator, grouthTypeDisplay, currentGrouthTypeDisplay } from './utils'; // utility functions
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import clsx from 'clsx';

const positionMapping = {
  is_starter: "先",
  is_relief: "中",
  is_closer: "抑",
  is_catcher: "捕",
  is_first: "一",
  is_second: "二",
  is_third: "三",
  is_short: "遊",
  is_outfielder: "外"
};

const extractTruePositions = (season) => {
  return Object.entries(season)
    .filter(([key, value]) => key.startsWith('is_') && value === true)
    .map(([key]) => positionMapping[key]);
};

const columns: GridColDef[] = [
  {
    field: "year",
    headerName: "年度",
    width: 75,
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
    field: "player_info",
    headerName: "選手情報",
    width: 125,
    renderCell: (player) => {
      return (
        <div>
          <div>Po: {extractTruePositions(player.row).join(', ')}</div>
          <div>成長T: {grouthTypeDisplay(player.row.growth_type)}</div>
          <div>現成長T: {currentGrouthTypeDisplay(player.row.current_growth_type)}</div>
        </div>
      );
    },
  },
  {
    field: "era",
    headerName: "era",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_season ? row.pitcher_season.era : 0 },
    renderCell: (player) => { { return player.row.pitcher_season ? player.row.pitcher_season.era : '-' } },
    cellClassName: (params: GridCellParams<any, number>) => {
      const value = params.row.pitcher_season ? params.row.pitcher_season.era : 0
      if (value == null) {
        return '';
      }
      return clsx('super-app', {
        high: value <= 1 && value > 0.01,
        mid: value <= 2.5 && value > 1,
        mod: value <= 4 && value > 2.5,
        low: value > 4
      });
    },
    sortable: true, // ソートを可能にする
  },
  {
    field: "games",
    headerName: "試合",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_season ? row.pitcher_season.games : 0 },
    renderCell: (player) => { { return player.row.pitcher_season ? player.row.pitcher_season.games : '-' } },
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }
      return clsx('super-app', {
        high: params.value >= 50,
        mid: params.value <= 50 &&  params.value > 25,
        mod: params.value <= 25 &&  params.value > 10,
        low: params.value <= 10 &&  params.value > 30,
      });
    },
    sortable: true, // ソートを可能にする
  },
  {
    field: "inning",
    headerName: "投球回",
    width: 75,
    valueGetter: (player,row) => { return row.pitcher_season ? (row.pitcher_season.innings + (row.pitcher_season.innings/3) ) : 0 },
    renderCell: (player) => { { return player.row.pitcher_season ? `${player.row.pitcher_season.innings} ${player.row.pitcher_season.thirds}/3` : '-' } },
    cellClassName: (params: GridCellParams<any, number>) => {
      const value = params.row.pitcher_season ? (params.row.pitcher_season.innings + (params.row.pitcher_season.thirds/3) ) : 0
      if (value == null) {
        return '';
      }
      return clsx('super-app', {
        high: value >= 143,
        mid: value < 143 &&  value >= 75,
        mod: value < 75 &&  value >= 30,
        low: value < 30 &&  value >= 1,
      });
    },
    sortable: true, // ソートを可能にする
  },
  {
    field: "win_lose",
    headerName: "勝敗",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_season ? row.pitcher_season.wins : 0 },
    renderCell: (player) => {
      return player.row.pitcher_season ?
    <div>
      <div>勝:{player.row.pitcher_season.wins}</div>
      <div>負:{player.row.pitcher_season.loses}</div>
      <div>{formatIndicator(player.row.pitcher_season.win_rate)}</div>
    </div>
        : '-'
      },
    sortable: true, // ソートを可能にする
  },
  {
    field: "hold_saves",
    headerName: "HS",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_season ? row.pitcher_season.wins : 0 },
    renderCell: (player) => {
      return player.row.pitcher_season ?
    <div>
      <div>H:{player.row.pitcher_season.hold_points}</div>
      <div>S:{player.row.pitcher_season.saves}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "k_bb",
    headerName: "KBB",
    width: 50,
    valueGetter: (player,row) => { return row.pitcher_season ? row.pitcher_season.strikeouts : 0 },
    renderCell: (player) => {
      return player.row.pitcher_season ?
    <div>
      <div>K:{player.row.pitcher_season.strikeouts}</div>
      <div>BB:{player.row.pitcher_season.bb}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
    {
      field: "stats",
      headerName: "指標",
      width: 125,
      valueGetter: (player,row) => { return row.pitcher_season ? row.pitcher_season.whip : 0 },
      renderCell: (player) => {
        return player.row.pitcher_season ?
      <div>
        <div>whip:{player.row.pitcher_season.whip}</div>
        <div>三振率:{player.row.pitcher_season.k9}</div>
        <div>四球率:{player.row.pitcher_season.bb9}</div>
        <div>K/BB:{player.row.pitcher_season.k_bb}</div>
      </div>
         : '-'
       },
       cellClassName: (params: GridCellParams<any, number>) => {
        const value = params.row.pitcher_season ? params.row.pitcher_season.whip : 0
        if (value == null) {
          return '';
        }
        return clsx('super-app', {
          high: value <= 1 && value > 0.01,
          mid: value <= 1.2 && value > 1,
          mod: value <= 1.4 && value > 1.2,
          low: value > 1.4
        });
      },
      sortable: true, // ソートを可能にする
    },
    {
      field: "memo",
      headerName: "シーズンメモ",
      width: 300,
      renderCell: (player) => player.row.memo, // 連想配列から値を取り出す
    }
];

const PlayerTableContent = ({ player }) => {
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
          rows={player.player_seasons}
          columns={columns}
          initialState={{
            density: 'compact',
          }}
          />
        </Box>
    </>
  );
};

export default PlayerTableContent;
