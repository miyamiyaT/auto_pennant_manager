import { Player, PlayerForm, createPlayer } from "./player";
import { PlayerSeason, PlayerSeasonForm, createPlayerSeason } from "./player_season";
import { PitcherSeason, PitcherSeasonForm, createPitcherSeason } from "./pitcher_season";
import { PitcherAbility, PitcherAbilityForm, createPitcherAbility } from "./pitcher_ability";
import { BreakingBall } from "./breaking_ball";

export type PitcherRegisterData = {
  player: Player;
  player_season: PlayerSeason;
  pitcher_season: PitcherSeason;
  pitcher_ability: PitcherAbility;
  breaking_ball: BreakingBall[];
};

export const createPitcherRegisterData = (overrides?: Partial<PitcherRegisterData>): PitcherRegisterData => ({
  player: createPlayer(),
  player_season: createPlayerSeason(),
  pitcher_season: createPitcherSeason(),
  pitcher_ability: createPitcherAbility(),
  breaking_ball: [],
  ...overrides,
});

// 送信フォーム用
export type PitcherRegisterFormData = {
  player: PlayerForm,
  player_season: PlayerSeasonForm;
  pitcher_season: PitcherSeasonForm;
  pitcher_ability: PitcherAbilityForm;
  breaking_ball: BreakingBall[];
};