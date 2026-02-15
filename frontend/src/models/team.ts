export type Team = {
    id?: number;
    name: string | null;
    sponsor: string | null;
};

export const createTeam = (overrides?: Partial<Team>): Team => ({
    name: "",
    sponsor: "",
    ...overrides,
});

// 送信フォーム用
export type TeamForm = {
    name: string;
    sponsor: string;
};

export const buildTeamPayload = (
    form: TeamForm
): Team => ({
    name: form.name || '',
    sponsor: form.sponsor || ''
});