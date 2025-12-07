import React from 'react';
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import clsx from 'clsx';
import { Box } from '@mui/material';
import { formatAverage, grouthTypeDisplay, currentGrouthTypeDisplay } from '../../components/utils'; // utility functions

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
      const { growth_type, current_growth_type } = player.row; // オブジェクト内の値を分解
      return (
        <div>
          <div>Po: {extractTruePositions(player.row).join(', ')}</div>
          <div>成長T: {grouthTypeDisplay(growth_type)}</div>
          <div>現成長T: {currentGrouthTypeDisplay(current_growth_type)}</div>
        </div>
      );
    },
  },
  {
    field: "batting_average",
    headerName: "打率",
    width: 50,
    valueGetter: (player,row) => { return row.batter_season ? row.batter_season.batting_average : 0 },
    renderCell: (player) => { { return player.row.batter_season ? formatAverage(player.row.batter_season.batting_average) : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        high: params.value >= 0.3,
        mid: params.value < 0.3 &&  params.value >= 0.25,
        mod: params.value < 0.25 &&  params.value >= 0.2,
        low: params.value < 0.2 && params.value >= 0.01,
      });
    },
  },
  {
    field: "games",
    headerName: "試合",
    width: 50,
    valueGetter: (player,row) => { return row.batter_season ? row.batter_season.games : 0 },
    renderCell: (player) => { { return player.row.batter_season ? player.row.batter_season.games : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        high: params.value >= 100,
        mid: params.value <= 99 &&  params.value >= 50,
        low: params.value <= 49 &&  params.value >= 25,
      });
    },
  },
  {
    field: "at_bat",
    headerName: "打席",
    width: 50,
    valueGetter: (player,row) => { return row.batter_season ? row.batter_season.at_bat : 0 },
    renderCell: (player) => { { return player.row.batter_season ? player.row.batter_season.at_bat : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        high: params.value >= 400,
        mid: params.value <= 399 &&  params.value >= 200,
        low: params.value <= 200 &&  params.value >= 60,
      });
    },
  },
  {
    field: "works",
    headerName: "出塁",
    width: 100,
    valueGetter: (player,row) => { return row.batter_season ? row.batter_season.total_bases : 0 },
    renderCell: (player) => {
      return player.row.batter_season ?
    <div>
      <div>安打:{player.row.batter_season.hits}</div>
      <div>塁打:{player.row.batter_season.total_bases}</div>
      <div>四球:{player.row.batter_season.works}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "others",
    headerName: "その他",
    width: 100,
    valueGetter: (player,row) => { return row.batter_season ? row.batter_season.hr : 0 },
    renderCell: (player) => {
      return player.row.batter_season ?
    <div>
      <div>本塁:{player.row.batter_season.hr}</div>
      <div>打点:{player.row.batter_season.rbi}</div>
      <div>盗塁:{player.row.batter_season.steals}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "stats",
    headerName: "指標",
    width: 100,
    valueGetter: (player,row) => { return row.batter_season ? row.batter_season.ops : 0 },
    renderCell: (player) => {
      return player.row.batter_season ?
    <div>
      <div>ops:{player.row.batter_season.ops}</div>
      <div>出塁:{formatAverage(player.row.batter_season.oba)}</div>
      <div>長打:{formatAverage(player.row.batter_season.slg)}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        high: params.value >= 0.9,
        mid: params.value < 0.9 &&  params.value >= 0.8334,
        mod: params.value < 0.8333 &&  params.value >= 0.7667,
        low: params.value < 0.766 && params.value >= 0.7,
      });
    },
  },
  {
    field: "memo",
    headerName: "シーズンメモ",
    width: 300,
    renderCell: (player) => player.row.memo, // 連想配列から値を取り出す
  }
];

const PlayerTableContent = ({ player_seasons }) => {
  return (
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
      rows={player_seasons}
      columns={columns}
      initialState={{
        density: 'compact',
      }}
      />
    </Box>
  );
};

export default PlayerTableContent;
