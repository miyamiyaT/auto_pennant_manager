import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { draftType } from '../../components/utils'; // utility functions

interface Player {
  id: number;
  name: string;
  birthday: string;
  is_favorite: boolean;
  season_count: number;
  memo: string;
  is_batter: boolean,
  is_pitcher: boolean,
  draft_year: number
}

interface Props {
  title: string;
  players: Player[];
}

const columns: GridColDef[] = [
  { field: "name", headerName: "名前", width: 125
   },
  { field: "is_batter", headerName: "打撃", width: 50,
    renderCell: (players) => {
      return players.row.is_batter ?
        (
          <Link to={`/batter/${players.id}`} style={{ textDecoration: 'none', color: 'blue' }}>打撃</Link>
        ) : null
      },
   },
  { field: "is_pitcher", headerName: "投球", width: 50,
    renderCell: (players) => {
      return players.row.is_pitcher ?
        (
          <Link to={`/pitcher/${players.id}`} style={{ textDecoration: 'none', color: 'blue' }}>投球</Link>
        ) : null
      },
   },
  { field: "birthday", headerName: "誕生日", width: 100 },
  { field: "is_favorite", headerName: "⭐️", width: 50,
    renderCell: (players) => {
      return players.row.is_favorite ? "⭐️" : null
      },
   },
  { field: "season_count", headerName: "年数", width: 50 },
  { field: "batter", headerName: "登録", width: 50,
    renderCell: (players) => {
      return players.row.is_batter ?
        (
          <Link to={`/batter-season-registration-form/${players.id}`} style={{ textDecoration: 'none', color: 'blue' }}>打撃</Link>
        ) : null
      },
   },
  { field: "pitcher", headerName: "", width: 50,
    renderCell: (players) => {
      return players.row.is_pitcher ?
        (
          <Link to={`/pitcher-season-registration-form/${players.id}`} style={{ textDecoration: 'none', color: 'blue' }}>投球</Link>
        ) : null
      },
   },
   { field: "draft" ,headerName: "ドラフト", width: 150 ,
      valueGetter: (player,row) => { return row.draft_year ? row.draft_year : 0 },
      renderCell: (players) => {
      return players.row.draft_year ?
    <div>{players.row.draft_year}年 {players.row.draft_rank}位 {draftType(players.row.draft_type)}</div>
       : '-'
     },
     sortable: true, // ソートを可能にする
   },
   { field: "memo",headerName: "ドラフトメモ", width: 400 },
];

const PlayerTable = ({ title, players }: Props) => {
  return (
    <div>
      <p>{title} {players.length}人</p>
      <DataGrid
        getRowHeight={() => 'auto'}
        rows={players}
        columns={columns}
      />
    </div>
  );
};

export default PlayerTable;
