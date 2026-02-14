import { BatterAbility, BatterAbilityForm, createBatterAbility } from "./batter_ability";
import { BatterSeason, BatterSeasonForm, createBatterSeason } from "./batter_season";
import { Player, PlayerForm, createPlayer } from "./player";
import { PlayerSeason, PlayerSeasonForm, createPlayerSeason } from "./player_season";


export type BatterRegisterData = {
  player: Player;
  player_season: PlayerSeason;
  batter_season: BatterSeason;
  batter_ability: BatterAbility;
};

export const createBatterRegisterData = (overrides?: Partial<BatterRegisterData>): BatterRegisterData => ({
  player: createPlayer(),
  player_season: createPlayerSeason(),
  batter_season: createBatterSeason(),
  batter_ability: createBatterAbility(),
  ...overrides,
});

// 送信フォーム用
export type BatterRegisterFormData = {
  player: PlayerForm,
  player_season: PlayerSeasonForm;
  batter_season: BatterSeasonForm;
  batter_ability: BatterAbilityForm;
};