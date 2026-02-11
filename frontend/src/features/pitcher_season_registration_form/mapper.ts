import { createBreakingBalls } from "../../models/breaking_ball";
import { createPitcherAbility } from "../../models/pitcher_ability";
import { createPitcherRegisterData, PitcherRegisterData } from "../../models/pitcher_register_form";
import { createPitcherSeason } from "../../models/pitcher_season";
import { createPlayer } from "../../models/player";
import { createPlayerSeason } from "../../models/player_season";


export const mapPitcherRegisterResponseToFormData = (
  data: PitcherRegisterData
  ) => {
  const playerData = data ?? {};

  return createPitcherRegisterData({
    player: createPlayer(playerData.player),
    player_season: createPlayerSeason(playerData.player_season),
    pitcher_season: createPitcherSeason(playerData.pitcher_season),
    pitcher_ability: createPitcherAbility(playerData.pitcher_ability),
    breaking_ball: createBreakingBalls(playerData.breaking_ball ?? []),
  });
};