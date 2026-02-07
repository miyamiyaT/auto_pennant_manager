import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
    player: {
        id: number;
        is_batter: boolean;
        is_pitcher: boolean;
    };
}

export const PlayerActionButtons = ({ player }: Props) => {
    const navigate = useNavigate();

    return (
        <Box
        mt={2}
        display="flex"
        flexDirection="column"
        gap={1.5}
        alignItems="center"
        >            
            {player.is_batter && (
                <>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/batter/${player.id}`)}
                >
                    打撃成績を見る
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                        navigate(`/batter-season-registration-form/${player.id}`)
                    }
                >
                    打撃成績を登録する
                </Button>
                </>
            )}

            {player.is_pitcher && (
                <>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/pitcher/${player.id}`)}
                >
                    投手成績を見る
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                    navigate(`/pitcher-season-registration-form/${player.id}`)
                    }
                >
                    投手成績を登録する
                </Button>
                </>
            )}
              {/* 新入団 */}
            {(!player.is_batter && !player.is_pitcher) && (
                <>
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                    navigate(`/batter-season-registration-form/${player.id}`)
                    }
                >
                    打者として登録
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                    navigate(`/pitcher-season-registration-form/${player.id}`)
                    }
                >
                    投手として登録
                </Button>
                </>
            )}
        </Box>
    );
};

export default PlayerActionButtons;
