export type PlayerSeason = {
    id?: number;
    year: number | null;
    age: number | null;
    number: string | null;
    growth_type: string | null;
    current_growth_type: string | null;
    is_starter: boolean;
    is_relief: boolean;
    is_closer: boolean;
    is_catcher: boolean;
    is_first: boolean;
    is_second: boolean;
    is_third: boolean;
    is_short: boolean;
    is_outfielder: boolean;
    plate_appearances: string;
    memo?: string;
};

export const createPlayerSeason = (overrides?: Partial<PlayerSeason>): PlayerSeason => ({
    year: null,
    age: null,
    number: null,
    growth_type: 'normal',
    current_growth_type: 'normal',
    is_starter: false,
    is_relief: false,
    is_closer: false,
    is_catcher: false,
    is_first: false,
    is_second: false,
    is_third: false,
    is_short: false,
    is_outfielder: false,
    plate_appearances: '',
    memo: '',
    ...overrides,
});

// 送信フォーム用
export type PlayerSeasonForm = {
  year: string;
  age: string;
  number: string;
  growth_type: string;
  current_growth_type: string;
  is_starter: string;
  is_relief: string;
  is_closer: string;
  is_catcher: string;
  is_first: string;
  is_second: string;
  is_third: string;
  is_short: string;
  is_outfielder: string;
  plate_appearances: string;
  memo: string;
};

export const buildPlayerSeasonPayload = (
  form: PlayerSeasonForm
): PlayerSeason => ({
  year: form.year ? Number(form.year) : 0,
  age: form.age ? Number(form.age) : 0,
  number: form.number || '',
  growth_type: form.growth_type || 'normal',
  current_growth_type: form.current_growth_type || 'decline_phase',
  is_starter: form.is_starter === "true",
  is_relief: form.is_relief === "true",
  is_closer: form.is_closer === "true",
  is_catcher: form.is_catcher === "true",
  is_first: form.is_first === "true",
  is_second: form.is_second === "true",
  is_third: form.is_third === "true",
  is_short: form.is_short === "true",
  is_outfielder: form.is_outfielder === "true",
  plate_appearances: form.plate_appearances || '',
  memo: form.memo || ''
});