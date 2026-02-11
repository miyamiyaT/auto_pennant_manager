// ドメインモデル

export type PitcherSeason = {
  games: number | null;
  innings: number | null;
  thirds: number | null;
  wins: number | null;
  loses: number | null;
  hold_points: number | null;
  saves: number | null;
  strikeouts: number | null;
  bb: number | null;
  hits_allowed_numbers: number | null;
  earned_runs: number | null;
  win_rate: number | null;
  era: number | null;
  bb9: number | null;
  k_bb: number | null;
  whip: number | null;
};

export const createPitcherSeason = (overrides?: Partial<PitcherSeason>): PitcherSeason => ({
    games: null,
    innings: null,
    thirds: null,
    wins: null,
    loses: null,
    hold_points: null,
    saves: null,
    strikeouts: null,
    bb: null,
    hits_allowed_numbers: null,
    earned_runs: null,
    win_rate: null,
    era: null,
    bb9: null,
    k_bb: null,
    whip: null,
    ...overrides,
});

export type PitcherSeasonForm = {
  games: string;
  innings: string;
  thirds: string;
  wins: string;
  loses: string;
  hold_points: string;
  saves: string;
  strikeouts: string;
  bb: string;
  hits_allowed_numbers: string;
  earned_runs: string;
  win_rate: string;
  era: string;
  bb9: string;
  k_bb: string;
  whip: string;
};


export const buildPitcherSeasonPayload = (
  form: PitcherSeasonForm,
  stats: PitcherSeasonForm,
): PitcherSeason => ({
  games: form.games ? Number(form.games) : 0,
  innings: form.innings ? Number(form.innings) : 0,
  thirds: form.thirds ? Number(form.thirds) : 0,
  wins: form.wins ? Number(form.wins) : 0,
  loses: form.loses ? Number(form.loses) : 0,
  hold_points: form.hold_points ? Number(form.hold_points) : 0,
  saves: form.saves ? Number(form.saves) : 0,
  strikeouts: form.strikeouts ? Number(form.strikeouts) : 0,
  bb: form.bb ? Number(form.bb) : 0,
  hits_allowed_numbers: form.hits_allowed_numbers ? Number(form.hits_allowed_numbers) : 0,
  earned_runs: form.earned_runs ? Number(form.earned_runs) : 0,
  win_rate: stats.win_rate ? Number(stats.win_rate) : 0,
  era: stats.era ? Number(stats.era) : 0,
  bb9: stats.bb9 ? Number(stats.bb9) : 0,
  k_bb: stats.bb9 ? Number(stats.bb9) : 0,
  whip: stats.whip ? Number(stats.whip) : 0,
});