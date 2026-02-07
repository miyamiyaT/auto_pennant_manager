import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DraftCell } from './components/draft_cell';
import RoleChip from './components/role_chip';
import ActiveChip from './components/active_chip';
import PlayerDrawer from './player_drawer';

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
  {
    field: 'active',
    headerName: '現役',
    width: 80,
    renderCell: ({ row }) => (
      <ActiveChip
        isActive={row.is_active}
      />
    ),
  },
  { field: "is_favorite", headerName: "⭐️", width: 50,
    renderCell: (players) => {
      return players.row.is_favorite ? "⭐️" : null
      },
   },
  { field: "name", headerName: "名前", width: 125
   },
  {
    field: 'role',
    headerName: '役割',
    width: 80,
    renderCell: ({ row }) => (
      <RoleChip
        isBatter={row.is_batter}
        isPitcher={row.is_pitcher}
      />
    ),
  },
  { field: "birthday", headerName: "誕生日", width: 100 },
  { field: "season_count", headerName: "年数", width: 50 },
   { field: "draft" ,headerName: "ドラフト", width: 180 ,
      valueGetter: (player,row) => { return row.draft_year ? row.draft_year : 0 },
      renderCell: DraftCell,
      sortable: true, // ソートを可能にする
   }
  ];

const PlayerTable = ({ title, players }: Props) => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div>
      <p>{title} {players.length}人</p>
      <DataGrid
        getRowHeight={() => 'auto'}
        rows={players}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={(params) => {
          setSelectedPlayer(params.row as Player);
        }}
      />
      <PlayerDrawer
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </div>
  );
};

export default PlayerTable;
