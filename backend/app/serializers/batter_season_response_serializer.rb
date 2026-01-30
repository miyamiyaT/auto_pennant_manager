class BatterSeasonResponseSerializer
  include Alba::Resource

  root_key :player, :players
  attributes :id, :name, :is_active

  attribute :player_season do |player|
    target = player.player_seasons.first
    PlayerSeasonSerializer.new(target).to_h if target
  end

  attribute :batter_season do |player|
    target = player.player_seasons.first&.batter_seasons&.first
    BatterSeasonSerializer.new(target).to_h if target
  end
end