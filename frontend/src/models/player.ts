export type Player = {
    id?: number;
    name: string;
    birthday: string | null;
    memo?: string;
    is_active: boolean;
    is_favorite: boolean;
    roy: boolean;
    draft_year: number | null;
    draft_type: string | null;
    draft_rank: number | null;
    season_count: number | null;
    is_batter: boolean;
    is_pitcher: boolean;
};

export const createPlayer = (overrides?: Partial<Player>): Player => ({
    name: "",
    birthday: null,
    is_active: true,
    is_favorite: false,
    roy: false,
    draft_year: null,
    draft_type: null,
    draft_rank: null,
    season_count: null,
    is_batter: false,
    is_pitcher: false,
    ...overrides,
});

// 送信フォーム用
export type PlayerForm = {
    name: string;
    birthday: string;
    is_active: string;
    is_favorite: string;
    roy: string;
    draft_year: string;
    draft_type: string;
    draft_rank: string;
    season_count: string;
    is_batter: string;
    is_pitcher: string;
    memo?: string;

};

export const buildPlayerPayload = (
    form: PlayerForm
): Player => ({
    name: form.name || '',
    birthday: form.birthday || '',
    memo: form.memo || '',
    is_active: form.is_active ? Boolean(form.is_active) : false,
    is_favorite: form.is_favorite ? Boolean(form.is_favorite) : false,
    roy: form.roy ? Boolean(form.roy) : false,
    draft_year: form.draft_year ? Number(form.draft_year) : 0,
    draft_type: form.draft_type || '',
    draft_rank: form.draft_rank ? Number(form.draft_rank) : 0,
    season_count: form.season_count ? Number(form.season_count) : 0,
    is_batter: form.is_batter ? Boolean(form.is_batter) : false,
    is_pitcher: form.is_pitcher ? Boolean(form.is_pitcher) : false
});