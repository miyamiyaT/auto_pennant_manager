class PitcherSeasonResponseSerializer
  include Alba::Resource

  root_key :player, :players
  attributes :id, :name, :is_active

  attribute :player_season do |player|
    target = player.player_seasons.first
    PlayerSeasonSerializer.new(target).to_h if target
  end

  attribute :pitcher_season do |player|
    target = player.player_seasons.first&.pitcher_seasons&.first
    PitcherSeasonSerializer.new(target).to_h if target
  end
end