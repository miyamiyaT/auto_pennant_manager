import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import { formatIndicator, grouthTypeDisplay, currentGrouthTypeDisplay } from '../../components/utils'; // utility functions
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
  { field: "name", headerName: "名前", width: 125,
    renderCell: (players) => {
      return players.row.name ?
        (
          <Link to={`/pitcher/${players.id}`} style={{ textDecoration: 'none', color: 'blue' }}>{players.row.name}</Link>
        ) : null
      },
   },
  {
    field: "age",
    headerName: "年齢",
    width: 50,
    renderCell: (player) => player.row.player_season.age, // 連想配列から値を取り出す
    cellClassName: (params: GridCellParams<any, number>) => {
      const value = params.row.player_season.age
      if (value == null) {
        return '';
      }
      return clsx('super-app', {
        high: value >= 31,
        mid: value <= 30 &&  value >= 27,
        mod: value <= 26 &&  value >= 23,
        low: value <= 22
      });
    },
    sortable: true, // ソートを可能にする
  },
  {
    field: "player_info",
    headerName: "選手情報",
    width: 125,
    renderCell: (player) => {
      const player_season = player.row.player_season
      const { growth_type, current_growth_type } = player.row.player_season; // オブジェクト内の値を分解
      return (
        <div>
          <div>Po: {extractTruePositions(player_season).join(', ')}</div>
          <div>成長T: {grouthTypeDisplay(growth_type)}</div>
          <div>現成長T: {currentGrouthTypeDisplay(current_growth_type)}</div>
        </div>
      );
    },
  },
  { field: "is_favorite", headerName: "⭐️", width: 50,
    renderCell: (players) => {
      return players.row.is_favorite ? "⭐️" : null
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
    renderCell: (player) => player.row.player_season.memo, // 連想配列から値を取り出す
  }
];


const PlayerTableContent = ({ player }) => {
  return (
    <div>
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
    </div>
  );
};

export default PlayerTableContent;
