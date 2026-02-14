// ドメインモデル

export type BatterSeason = {
  games: number | null;
  at_bat: number | null;
  hits: number | null;
  hr: number | null;
  works: number | null;
  total_bases: number | null;
  rbi: number | null;
  steals: number | null;
  batting_average: number | null;
  ab_hr: number | null;
  slg: number | null;
  oba: number | null;
  ops: number | null;
};

export const createBatterSeason = (overrides?: Partial<BatterSeason>): BatterSeason => ({
    games: null,
    at_bat: null,
    hits: null,
    hr: null,
    works: null,
    total_bases: null,
    rbi: null,
    steals: null,
    batting_average: null,
    ab_hr: null,
    slg: null,
    oba: null,
    ops: null,
    ...overrides,
});

export type BatterSeasonForm = {
  games: string;
  at_bat: string;
  hits: string;
  hr: string;
  works: string;
  total_bases: string;
  rbi: string;
  steals: string;
  batting_average: string;
  ab_hr: string;
  slg: string;
  oba: string;
  ops: string;
};


export const buildBatterSeasonPayload = (
  form: BatterSeasonForm,
  stats: BatterSeasonForm,
): BatterSeason => ({
  games: form.games ? Number(form.games) : 0,
  at_bat: form.at_bat ? Number(form.at_bat) : 0,
  hits: form.hits ? Number(form.hits) : 0,
  hr: form.hr ? Number(form.hr) : 0,
  works: form.works ? Number(form.works) : 0,
  total_bases: form.total_bases ? Number(form.total_bases) : 0,
  rbi: form.rbi ? Number(form.rbi) : 0,
  steals: form.steals ? Number(form.steals) : 0,
  batting_average: form.batting_average ? Number(form.batting_average) : 0,
  ab_hr: form.ab_hr ? Number(form.ab_hr) : 0,
  slg: form.slg ? Number(form.slg) : 0,
  oba: stats.oba ? Number(stats.oba) : 0,
  ops: stats.ops ? Number(stats.ops) : 0
});