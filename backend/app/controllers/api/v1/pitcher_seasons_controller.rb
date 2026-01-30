class Api::V1::PitcherSeasonsController < ApplicationController
  def years
    year = Player.get_year_item(params[:id])

    render status: :ok, json: year
  end

  def show
    position_conditions = Players::PitcherPositionQuery.new(params[:positions]).call
    pitcher_season = Players::SeasonPlayerByTeamYearPositionQuery.new(
      team_id: params[:id],
      year: params[:year], 
      position_conditions: position_conditions
    ).call

    render status: :ok, json: PitcherSeasonResponseSerializer.new(pitcher_season).serialize
  end

  def create
    # 野手登録
    ActiveRecord::Base.transaction do
      # シーズン記録の存在確認および新規作成
      player = Player.find(player_params[:id])
      player.update(player_params)

      player_season = PlayerSeason.find_or_create_by(player_id: player.id, year:  player_season_params[:year])
      player_season.assign_attributes(player_season_params)
      player_season.save!

      batter_season = BatterSeason.find_or_create_by(player_season_id: player_season.id)
      batter_season.assign_attributes(batter_season_params)
      batter_season.save!

      batter_ability = BatterAbility.find_or_create_by(player_season_id: player_season.id)
      batter_ability.assign_attributes(batter_ability_params)
      batter_ability.save!

      render json: player_season, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def update
  end

  private

  def player_params()
    params.require(:player)
          .permit(:id, :is_active )
  end

  def player_season_params()
    params.require(:player_season)
          .permit(:player_id, :year, :age, :memo, 
                  :growth_type, :current_growth_type, 
                  :is_starter, :is_relief, :is_closer,
                  :is_catcher, :is_first, :is_second, :is_third,
                  :is_short, :is_outfielder)
  end

  def batter_season_params
    params.require(:batter_season)
          .permit(:games, :at_bat, :hits, :hr, :works, :total_bases, :rbi,
                  :steals, :batting_average, :ab_hr, :slg, :oba, :ops
                )
  end

  def batter_ability_params
    params.require(:batter_ability)
          .permit(:trajectory, :hit, :power, :run_speed, :arm_strength,
                  :fielding, :catching, :clutch_rank, :vs_lhp_rank, :stealing_rank, 
                  :running_rank, :throwing_rank, :catcher_rank, 
                  :grit_rank, :recovery_rank, :special_ability
                  )
  end
end
