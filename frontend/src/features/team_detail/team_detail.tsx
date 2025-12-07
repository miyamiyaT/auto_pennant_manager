import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerTable from './player_table';
import SeasonList from './season_list';
import ActionButtons from './action_burrons';

interface Player {
  id: number;
  name: string;
  birthday: string;
  is_favorite: boolean;
  is_batter: boolean;
  is_pitcher: boolean;
  season_count: number;
  memo: string;
}

interface Team {
  name: string;
  sponsor: string;
}

interface Year {
  latest_year: number;
  years: number[];
}

interface Id {
  id: number
}

interface Props {
  active_players: Player[];
  retire_players: Player[];
  season_list: number[];
  team: Team[];
  year: Year[];
}


const TeamDetails = () => {
  const { id } = useParams<Id>();
  const [teamDetail, setTeamDetail] = useState<Props>();

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

  return (
    <div>
      <p>チーム名: {teamDetail["team"].name} {teamDetail["team"].sponsor}</p>
      <ActionButtons id={id} year={teamDetail["year"]}/>
      <PlayerTable title="現役選手"  players={teamDetail["active_players"]} />
      <PlayerTable title="退団選手" players={teamDetail["retire_players"]} />
      <SeasonList seasons={teamDetail["season_list"]} />
    </div>
  );
};

export default TeamDetails;