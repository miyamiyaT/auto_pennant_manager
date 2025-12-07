import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Team {
  id: number;
  sponsor: string;
  name: string;
};

function TeamList() {

  const [teamList, setTeamList] = useState<Team[]>([]);


  useEffect(() => {
    //fetch('APIのエンドポイントを記述')
    fetch('http://localhost:3000/api/v1/teams')
      .then(response => response.json())
      .then(data => setTeamList(data))
      .catch(error => console.error("Fetching data failed", error));
  }, []);

  if (!teamList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p>チーム一覧</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamList.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.id}</TableCell>
                <TableCell>
                  <Link to={`/teams/${team.id}`}>
                    {team.sponsor + team.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TeamList;