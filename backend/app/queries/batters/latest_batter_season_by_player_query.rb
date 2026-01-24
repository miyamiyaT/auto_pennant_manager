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

    
      # player_list.map do |player|
      #   # player_seasonsを年度の降順でソートし、最初のレコードだけを取得
      #   latest_player_season = player.player_seasons.order(year: :desc).first
    
      #   if latest_player_season
      #     batter_season = latest_player_season.batter_seasons.first
      #     batter_ability = latest_player_season.batter_abilities.first
    
      #     player_season_data = {
      #       year: latest_player_season.year,
      #       age: latest_player_season.age,
      #       memo: latest_player_season.memo,
      #       growth_type: latest_player_season.growth_type,
      #       current_growth_type: latest_player_season.current_growth_type,
      #       is_starter: latest_player_season.is_starter,
      #       is_relief: latest_player_season.is_relief,
      #       is_closer: latest_player_season.is_closer,
      #       is_catcher: latest_player_season.is_catcher,
      #       is_first: latest_player_season.is_first,
      #       is_second: latest_player_season.is_second,
      #       is_third: latest_player_season.is_third,
      #       is_short: latest_player_season.is_short,
      #       is_outfielder: latest_player_season.is_outfielder,
      #       batter_season: batter_season,
      #       batter_ability: batter_ability
      #     }
      #   end
    
      #   {
      #     id: player.id,
      #     name: player.name,
      #     memo: player.memo,
      #     birthday: player.birthday,
      #     is_active: player.is_active,
      #     player_seasons: player_season_data ? [player_season_data] : []
      #   }
      # end
    end
  end
end