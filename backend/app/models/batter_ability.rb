class BatterAbility < ApplicationRecord
    # バリデーション
    validates :trajectory, presence: true, inclusion: 0..4, allow_nil: true
    validates :hit, presence: true, inclusion: 0..100, allow_nil: true
    validates :power, presence: true, inclusion: 0..100, allow_nil: true
    validates :run_speed, presence: true, inclusion: 0..100, allow_nil: true
    validates :arm_strength, presence: true, inclusion: 0..100, allow_nil: true
    validates :fielding, presence: true, inclusion: 0..100, allow_nil: true
    validates :catching, presence: true, inclusion: 0..100, allow_nil: true
    validates :clutch, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :vs_lhp, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :stearing, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :runnning, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :throwing, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
    validates :catcher, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :grit, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true}
    validates :recovery, inclusion: { in: ['G','F','E','D','C','B','A','S'], allow_blank: true }
  
    # アソシエーション
    belongs_to :player_season
end
