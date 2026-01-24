module Batters
  class LatestBatterSeasonByPlayerQuery
    def initialize(player_id:)
      @player_id = player_id
    end

    def call
      player = Player
        .includes(player_seasons: [:batter_seasons, :batter_abilities])
        .find_by(id: @player_id, deleted_at: nil)

      return nil unless player

      season = player.player_seasons.order(year: :desc).first

      {
        player:          player,
        player_season:   season,
        batter_season:   season&.batter_seasons&.first,
        batter_ability:  season&.batter_abilities&.first
      }
    end
  end
end