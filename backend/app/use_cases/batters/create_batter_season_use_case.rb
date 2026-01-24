module Batters
  class CreateBatterSeasonUseCase
    def initialize(
      player_params:,
      player_season_params:,
      batter_season_params:,
      batter_ability_params:
    )

      @player_params = player_params
      @player_season_params = player_season_params
      @batter_season_params = batter_season_params
      @batter_ability_params = batter_ability_params
    end

    def call
      ActiveRecord::Base.transaction do
        player = Player.find(@player_params[:id])
        player.update!(@player_params)

        player_season = PlayerSeason.find_or_create_by!(
          player_id: player.id,
          year: @player_season_params[:year]
        )
        player_season.update!(@player_season_params)

        batter_season = BatterSeason.find_or_create_by!(
          player_season_id: player_season.id
        )
        batter_season.update!(@batter_season_params)

        batter_ability = BatterAbility.find_or_create_by!(
          player_season_id: player_season.id
        )
        batter_ability.update!(@batter_ability_params)

        player_season
      end
    end
  end
end