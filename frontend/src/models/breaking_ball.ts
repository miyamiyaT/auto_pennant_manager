export type BreakingBall = {
  direction: number | null;
  is_original: boolean;
  name: string;
  variation: number | null;
};

export const createBreakingBall = ( overrides?: Partial<BreakingBall> ): BreakingBall => ({
  direction: null,
  is_original: false,
  name: "",
  variation: null,
  ...overrides,
});

export const createBreakingBalls = ( balls: Partial<BreakingBall>[] = [] ): BreakingBall[] =>
  balls.map((ball) => createBreakingBall(ball));