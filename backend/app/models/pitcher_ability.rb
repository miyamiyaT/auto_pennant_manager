class PitcherAbility < ApplicationRecord
      # RANKS = { G: 0, F: 1, E: 2, D: 3, C: 4, B: 5, A: 6, S: 7 }.freeze      
      RANKS = { g: 0, f: 1, e: 2, d: 3, c: 4, b: 5, a: 6, s: 7 }.freeze

      # バリデーション
      validates :pitch_velocity, inclusion: 0..180, allow_nil: true
      validates :control, inclusion: 0..100, allow_nil: true
      validates :stamina, inclusion: 0..100, allow_nil: true
      validates :w_risp, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true
      validates :heather, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true
      validates :vs_lbh, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true
      validates :agile, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true
      validates :poise, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true
      validates :grit, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true
      validates :recovery, inclusion: { in: ['G','F','E','D','C','B','A','S'] }, allow_nil: true

      validates :w_risp_rank, :heather_rank, :vs_lbh_rank, :agile_rank, :poise_rank, :grit_rank, :recovery_rank, presence: true

      enum w_risp_rank: RANKS, _prefix: true
      enum heather_rank: RANKS, _prefix: true
      enum vs_lbh_rank: RANKS, _prefix: true
      enum agile_rank:  RANKS, _prefix: true
      enum poise_rank: RANKS, _prefix: true
      enum grit_rank: RANKS, _prefix: true
      enum recovery_rank: RANKS, _prefix: true

      # アソシエーション
      belongs_to :player_season
end
