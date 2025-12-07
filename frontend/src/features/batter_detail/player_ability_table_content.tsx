import React from 'react';
import { Box } from '@mui/material';
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
    field: "trajectory",
    headerName: "弾道",
    width: 50,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.trajectory : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.trajectory : '-' } },
    sortable: true, // ソートを可能にする
    cellClassName: (params: GridCellParams<any, number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        s_rank: params.value == 4,
        a_rank: params.value == 3,
        b_rank: params.value == 2,
        c_rank: params.value == 1,
      });
    },
  },
  {
    field: "hit",
    headerName: "ミート",
    width: 60,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.hit : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.hit : '-' } },
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
    field: "power",
    headerName: "パワー",
    width: 60,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.power : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.power : '-' } },
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
    field: "run_speed",
    headerName: "走力",
    width: 60,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.run_speed : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.run_speed : '-' } },
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
    field: "arm_strength",
    headerName: "肩力",
    width: 60,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.arm_strength : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.arm_strength : '-' } },
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
    field: "fielding",
    headerName: "守備力",
    width: 60,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.fielding : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.fielding : '-' } },
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
    field: "catching",
    headerName: "捕球",
    width: 60,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.catching : 0 },
    renderCell: (player) => { { return player.row.batter_ability ? player.row.batter_ability.catching : '-' } },
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
    field: "batting_ability",
    headerName: "打撃特能",
    width: 75,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.clutch : 0 },
    renderCell: (player) => {
      return player.row.batter_ability ?
    <div>
      <div>好機:{player.row.batter_ability.clutch}</div>
      <div>対左:{player.row.batter_ability.vs_lhp}</div>
      <div>回復:{player.row.batter_ability.recovery}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "running_ability",
    headerName: "走塁特能",
    width: 75,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.stearing : 0 },
    renderCell: (player) => {
      return player.row.batter_ability ?
    <div>
      <div>盗塁:{player.row.batter_ability.stearing}</div>
      <div>走塁:{player.row.batter_ability.runnning}</div>
      <div>怪我:{player.row.batter_ability.grit}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "fielding_ability",
    headerName: "守備特能",
    width: 75,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.stearing : 0 },
    renderCell: (player) => {
      return player.row.batter_ability ?
    <div>
      <div>送球:{player.row.batter_ability.throwing}</div>
      <div>捕手:{player.row.batter_ability.catcher}</div>
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  },
  {
    field: "special_ability",
    headerName: "特殊能力",
    width: 250,
    valueGetter: (player,row) => { return row.batter_ability ? row.batter_ability.special_ability : 0 },
    renderCell: (player) => {
      return player.row.batter_ability ?
    <div>
      {player.row.batter_ability.special_ability}
    </div>
       : '-'
     },
    sortable: true, // ソートを可能にする
  }
];

const PlayerAbilityTableContent = ({ player_seasons }) => {
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
        rows={player_seasons}
        columns={columns}
        initialState={{
          density: 'compact',
        }}
        />
      </Box>
    </>
  );
};

export default PlayerAbilityTableContent;
