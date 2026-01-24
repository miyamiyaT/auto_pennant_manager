class Api::V1::BattersController < ApplicationController
  def show
    player = Batters::AllBatterSeasonByPlayerQuery.new(player_id: params[:id]).call

    render status: :ok, json: AllBatterSeasonSerializer.new(player).serialize
  end

  def register
    # 登録時に昨シーズンの成績を取得する。
    player = Batters::LatestBatterSeasonByPlayerQuery.new(player_id: params[:id]).call

    render status: :ok, json: LatestBatterSeasonSerializer.new(player).serialize
  end

  def create
    # 野手登録
    result = Batters::CreateBatterSeasonUseCase.new(
      player_params: player_params,
      player_season_params: player_season_params,
      batter_season_params: batter_season_params,
      batter_ability_params: batter_ability_params
    )

    render json: result, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
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
