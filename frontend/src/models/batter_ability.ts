// ドメインモデル
export type BatterAbility = {
  trajectory: number | null;
  hit: number | null;
  power: number | null;
  run_speed: number | null;
  arm_strength: number | null;
  fielding: number | null;
  catching: number | null;

  clutch_rank: string | null;
  vs_lhp_rank: string | null;
  stealing_rank: string | null;
  running_rank: string | null;
  throwing_rank: string | null;
  catcher_rank: string | null;
  grit_rank: string | null;
  recovery_rank: string | null;
  special_ability?: string | null;
};

export const createBatterAbility = (overrides?: Partial<BatterAbility>): BatterAbility => ({
  trajectory: null,
  hit: null,
  power: null,
  run_speed: null,
  arm_strength: null,
  fielding: null,
  catching: null,
  clutch_rank: 'D',
  vs_lhp_rank: 'D',
  stealing_rank: 'D',
  running_rank: 'D',
  throwing_rank: 'D',
  catcher_rank: 'D',
  grit_rank: 'D',
  recovery_rank: 'D',
  special_ability: '',
  ...overrides,
});

// 送信フォーム用
export type BatterAbilityForm = {
  trajectory: string;
  hit: string;
  power: string;
  run_speed: string;
  arm_strength: string;
  fielding: string;
  catching: string;
  clutch_rank: string;
  vs_lhp_rank: string;
  stealing_rank: string;
  running_rank: string;
  throwing_rank: string;
  catcher_rank: string;
  grit_rank: string;
  recovery_rank: string;
  special_ability: string;
};

export const buildBatterAbilityPayload = (
  form: BatterAbilityForm
): BatterAbility => ({
  trajectory: form.trajectory ? Number(form.trajectory) : 0,
  hit: form.hit ? Number(form.hit) : 0,
  power: form.power ? Number(form.power) : 0,
  run_speed: form.run_speed ? Number(form.run_speed) : 0,
  arm_strength: form.arm_strength ? Number(form.arm_strength) : 0,
  fielding: form.fielding ? Number(form.fielding) : 0,
  catching: form.catching ? Number(form.catching) : 0,
  clutch_rank: form.clutch_rank || 'D',
  vs_lhp_rank: form.vs_lhp_rank || 'D',
  stealing_rank: form.stealing_rank || 'D',
  running_rank: form.running_rank || '',
  throwing_rank: form.throwing_rank || 'D',
  catcher_rank: form.catcher_rank || 'D',
  grit_rank: form.grit_rank || 'D',
  recovery_rank: form.recovery_rank || 'D',
  special_ability: form.special_ability || null,
});