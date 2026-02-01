module Pitchers
  class LatestPitcherSeasonByPlayerQuery < BasePitcherQuery
    def initialize(player_id:)
      @player_id = player_id
    end

    def call
      player = base_pitcher_relation
      return nil unless player

      season = player.player_seasons.order(year: :desc).first

      {
        player: player,
        player_season: season,
        pitcher_season: season&.pitcher_seasons&.first,
        pitcher_ability: season&.pitcher_abilities&.first,
        breaking_ball: season&.breaking_balls
      }
    end
  end
end