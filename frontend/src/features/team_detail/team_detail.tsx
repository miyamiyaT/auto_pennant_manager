import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerTable from './player_table';
import ActionButtons from './action_burrons';
import { TeamDetail } from '../../models/team_detail';

const TeamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [teamDetail, setTeamDetail] = useState<TeamDetail>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/teams/${id}`)
      .then(response => response.json())
      .then(data => {
        setTeamDetail(data)
      })
      .catch(error => console.error("Fetching data failed", error));
  }, [id]);

  if (!teamDetail) {
    return <div>Loading...</div>;
  }

  if (!id) return <div>Invalid ID</div>;
    console.log(teamDetail)
  return (
    <div>
      <p>チーム名: {teamDetail.team.name} {teamDetail.team.sponsor}</p>
      <ActionButtons id ={id} />
      <PlayerTable title="現役選手"  players={teamDetail.active_players} />
      <PlayerTable title="退団選手"  players={teamDetail.retire_players} />

    </div>
  );
};

export default TeamDetails;