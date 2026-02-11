// ドメインモデル
export type PitcherAbility = {
  pitch_velocity: number | null;
  control: number | null;
  stamina: number | null;
  w_risp_rank: string | null;
  heather_rank: string | null;
  vs_lbh_rank: string | null;
  agile_rank: string | null;
  poise_rank: string | null;
  grit_rank: string | null;
  recovery_rank: string | null;
  special_ability?: string | null;
};

export const createPitcherAbility = (overrides?: Partial<PitcherAbility>): PitcherAbility => ({
  pitch_velocity: null,
  control: null,
  stamina: null,
  w_risp_rank: 'D',
  heather_rank: 'D',
  vs_lbh_rank: 'D',
  agile_rank: 'D',
  poise_rank: 'D',
  grit_rank: 'D',
  recovery_rank: 'D',
  special_ability: '',
  ...overrides,
});

// 送信フォーム用
export type PitcherAbilityForm = {
  pitch_velocity: string;
  control: string;
  stamina: string;
  w_risp_rank: string;
  heather_rank: string;
  vs_lbh_rank: string;
  agile_rank: string;
  poise_rank: string;
  grit_rank: string;
  recovery_rank: string;
  special_ability: string;
};

export const buildPitcherAbilityPayload = (
  form: PitcherAbilityForm
): PitcherAbility => ({
  pitch_velocity: form.pitch_velocity ? Number(form.pitch_velocity) : 0,
  control: form.control ? Number(form.control) : 0,
  stamina: form.stamina ? Number(form.stamina) : 0,
  w_risp_rank: form.w_risp_rank || 'D',
  heather_rank: form.heather_rank || 'D',
  vs_lbh_rank: form.vs_lbh_rank || 'D',
  agile_rank: form.agile_rank || 'D',
  poise_rank: form.poise_rank || 'D',
  grit_rank: form.grit_rank || 'D',
  recovery_rank: form.recovery_rank || 'D',
  special_ability: form.special_ability || null,
});