module Pitchers
  class CreatePitcherSeasonUseCase
    def initialize(
      player_params:,
      player_season_params:,
      pitcher_season_params:,
      pitcher_ability_params:,
      breaking_ball_params:
    )
      @player_params = player_params
      @player_season_params = player_season_params
      @pitcher_season_params = pitcher_season_params
      @pitcher_ability_params = pitcher_ability_params
      @breaking_ball_params = breaking_ball_params
    end

    def call
      ActiveRecord::Base.transaction do
        # シーズン記録の存在確認および新規作成
        player = Player.find(@player_params[:id])
        player.update!(@player_params)

        player_season = PlayerSeason.find_or_create_by!(
          player_id: player.id,
          year: @player_season_params[:year]
        )
        player_season.update!(@player_season_params)

        PitcherSeason.find_or_create_by!(
          player_season_id: player_season.id
        ).update!(@pitcher_season_params)

        PitcherAbility.find_or_create_by!(
          player_season_id: player_season.id
        ).update!(@pitcher_ability_params)

        replace_breaking_balls!(player_season)

        player_season
      end
    end

    private

    def replace_breaking_balls!(player_season)
      BreakingBall.where(player_season_id: player_season.id).delete_all

      balls =
        @breaking_ball_params.map do |params|
          params.merge(player_season_id: player_season.id)
        end

      BreakingBall.insert_all!(balls) if balls.any?
    end
  end
end