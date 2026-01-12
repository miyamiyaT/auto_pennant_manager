class BatterAbility < ApplicationRecord
    RANKS = { G: 0, F: 1, E: 2, D: 3, C: 4, B: 5, A: 6, S: 7 }.freeze      

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

    enum clutch_rank:   RANKS, _prefix: true
    enum vs_lhp_rank:   RANKS, _prefix: true
    enum stealing_rank: RANKS, _prefix: true
    enum running_rank:  RANKS, _prefix: true
    enum throwing_rank: RANKS, _prefix: true
    enum catcher_rank:  RANKS, _prefix: true
    enum grit_rank:     RANKS, _prefix: true
    enum recovery_rank: RANKS, _prefix: true

    # アソシエーション
    belongs_to :player_season
end
