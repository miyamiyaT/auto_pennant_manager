module Batters
  class AllBatterSeasonByPlayerQuery < BaseBatterQuery
    def initialize(player_id:)
      @player_id = player_id
    end

    def call
      player = base_batter_relation
      return nil unless player

      { player: player,
        seasons: player.player_seasons
                      .order(year: :desc)
                      .map do |season|
          {
            player_season: season,
            batter_season: season.batter_seasons.first,
            batter_ability: season.batter_abilities.first
          }
        end
      }
    end
  end
end 