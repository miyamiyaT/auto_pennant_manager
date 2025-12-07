class PitcherAbility < ApplicationRecord
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
    
      # アソシエーション
      belongs_to :player_season
end
