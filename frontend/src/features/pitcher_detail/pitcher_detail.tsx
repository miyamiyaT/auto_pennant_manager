import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import PlayerResultTableContent from '../../components/pitcher_result_table_content';
import PlayerAbilityTableContent from './player_ability_table_content';
import ActionButtons from '../../components/action_buttons'
import { draftType } from '../../components/utils';

const PitcherTable = () => {
  const { id } = useParams();
  const [playerDetails, setPlayerDetail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/pitchers/${id}`)
      .then(response => response.json())
      .then(data => setPlayerDetail(data))
      .catch(error => console.error("Fetching data failed", error));
  }, [id]);

  if (!playerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box mt={5}>
        {playerDetails.player.map(player => (
          <Box key={player.id} mb={4}>
            <ActionButtons id={id} />
            <br></br>
            <Typography variant="body1" gutterBottom>
              {player.draft_year}年 ドラフト{player.draft_rank}位 {draftType(player.draft_type)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {player.memo}
            </Typography>
            <Typography variant="h5" gutterBottom>
              投球成績: {player.name}
            </Typography>
            <PlayerResultTableContent player={player} />
            <br></br>
            <br></br>
            <Typography variant="h5" gutterBottom>
              投球能力: {player.name}
            </Typography>
            <PlayerAbilityTableContent player={player.player_seasons} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default PitcherTable;
