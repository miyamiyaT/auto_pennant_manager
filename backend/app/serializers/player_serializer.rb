class PlayerSerializer
  include Alba::Resource

  attributes :id, :name, :birthday, :memo, :is_active, :is_favorite, :roy, 
  :draft_year, :draft_type, :draft_rank

  attribute :season_count do |player|
    player.player_seasons.size
  end

  attribute :is_batter do |player|
    player.player_seasons.any? { |s| s.batter_seasons.present? }
  end

  attribute :is_pitcher do |player|
    player.player_seasons.any? { |s| s.pitcher_seasons.present? }
  end
end