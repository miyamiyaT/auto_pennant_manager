import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { buildDraftText } from "../../components/utils";
import { useNavigate } from "react-router-dom";
import PlayerActionButtons from "./components/player_action_buttons";

interface Props {
    player: any | null;
    onClose: () => void;
}

export const PlayerDrawer = ({ player, onClose }: Props) => {
    const navigate = useNavigate();

    return (
    <Drawer anchor="right" open={!!player} onClose={onClose}>
        {player && (
        <Box p={2} width={360}>
            <Typography variant="h6">{player.name}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>
                ドラフト: {buildDraftText(player)}
            </Typography>
            <Typography mt={2}>
                メモ: {player.memo || 'メモはありません'}
            </Typography>
            {player && (
                <PlayerActionButtons player={player} />
            )}
        </Box>
        )}
    </Drawer>
    );
};

export default PlayerDrawer;