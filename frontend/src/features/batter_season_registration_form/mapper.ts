import { createBatterAbility } from "../../models/batter_ability";
import { BatterRegisterData, createBatterRegisterData } from "../../models/batter_register_form";
import { createBatterSeason } from "../../models/batter_season";
import { createPlayer } from "../../models/player";
import { createPlayerSeason } from "../../models/player_season";


export const mapBatterRegisterResponseToFormData = (
  data: BatterRegisterData
  ) => {
  const playerData = data ?? {};

  return createBatterRegisterData({
    player: createPlayer(playerData.player),
    player_season: createPlayerSeason(playerData.player_season),
    batter_season: createBatterSeason(playerData.batter_season),
    batter_ability: createBatterAbility(playerData.batter_ability)
  });
};