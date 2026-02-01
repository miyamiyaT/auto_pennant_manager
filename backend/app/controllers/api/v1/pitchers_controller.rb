class Api::V1::PitchersController < ApplicationController
  def index
  end

  def show
    player = Pitchers::AllPitcherSeasonByPlayerQuery.new(player_id: params[:id]).call

    render status: :ok, json: AllPitcherSeasonSerializer.new(player).serialize
  end

  def register
    # 登録時に昨シーズンの成績を取得する。
    player = Pitchers::LatestPitcherSeasonByPlayerQuery.new(player_id: params[:id]).call

    render status: :ok, json: LatestPitcherSeasonSerializer.new(player).serialize
  end

  def create
    # 投手シーズン記録の登録
    result = Pitchers::CreatePitcherSeasonUseCase.new(
      player_params: player_params,
      player_season_params: player_season_params,
      pitcher_season_params: pitcher_season_params,
      pitcher_ability_params: pitcher_ability_params,
      breaking_ball_params: breaking_ball_params
    )

    render json: result, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    post = Player.find(params[:id])
    if post.update(player_params)
      render json: post, status: :ok
    else
      render json: post.errors, status: :unprocessable_entity
    end
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

  def pitcher_season_params
    params.require(:pitcher_season)
          .permit(:games, :innings, :thirds, :wins, :loses, :saves, :hold_points,
                  :strikeouts, :bb, :hits_allowed_numbers, :earned_runs, :win_rate,
                  :era , :k9, :bb9, :k_bb ,:whip,
                )
  end

  def pitcher_ability_params
    params.require(:pitcher_ability)
          .permit(:pitch_velocity, :control, :stamina, :w_risp_rank, :heather_rank, :vs_lbh_rank,
                  :agile_rank, :poise_rank, :grit_rank, :recovery_rank, :special_ability
                  )
  end

  def breaking_ball_params
    params.require(:breaking_ball).map do |bb_params|
      bb_params.permit(:name, :direction, :variation, :is_original)
    end
  end
end
