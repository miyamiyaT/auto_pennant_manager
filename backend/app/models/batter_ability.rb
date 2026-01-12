class BatterAbility < ApplicationRecord
    RANKS = { g: 0, f: 1, e: 2, d: 3, c: 4, b: 5, a: 6, s: 7 }.freeze

    # バリデーション
    validates :trajectory, presence: true, inclusion: 0..4
    validates :hit, presence: true, inclusion: 0..100
    validates :power, presence: true, inclusion: 0..100
    validates :run_speed, presence: true, inclusion: 0..100
    validates :arm_strength, presence: true, inclusion: 0..100
    validates :fielding, presence: true, inclusion: 0..100
    validates :catching, presence: true, inclusion: 0..100
    validates :clutch, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :vs_lhp, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :stearing, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :runnning, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :throwing, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :catcher, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :grit, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :recovery, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :clutch_rank, :vs_lhp_rank, :stealing_rank, :running_rank, :throwing_rank, :grit_rank, :recovery_rank, presence: true

    enum clutch_rank:   RANKS
    enum vs_lhp_rank:   RANKS
    enum stealing_rank: RANKS
    enum running_rank:  RANKS
    enum throwing_rank: RANKS
    enum catcher_rank:  RANKS
    enum grit_rank:     RANKS
    enum recovery_rank: RANKS



    # アソシエーション
    belongs_to :player_season
end
