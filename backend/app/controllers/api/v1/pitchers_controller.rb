class Api::V1::PitchersController < ApplicationController
  def index
  end

  def show
    if params[:type]
      player = Player.get_pitcher_last_item(params[:id])
    else
      player = Player.get_pitcher_item(params[:id])
    end
    render status: :ok, json:{player: player}
  end


  def create
    # 投手登録
    ActiveRecord::Base.transaction do
      # シーズン記録の存在確認および新規作成
      player = Player.find(player_params[:id])
      player.update(player_params)

      player_season = PlayerSeason.find_or_create_by(player_id: player.id, year:  player_season_params[:year])
      player_season.assign_attributes(player_season_params)
      player_season.save!

      pitcher_season = PitcherSeason.find_or_create_by(player_season_id: player_season.id)
      pitcher_season.assign_attributes(pitcher_season_params)
      pitcher_season.save!

      pitcher_ability = PitcherAbility.find_or_create_by(player_season_id: player_season.id)
      pitcher_ability.assign_attributes(pitcher_ability_params)
      pitcher_ability.save!

      BreakingBall.where(player_season_id: player_season.id).destroy_all

      breaking_ball_params_with_season = breaking_ball_params.map do |bb_params|
        bb_params.merge(player_season_id: player_season.id)
      end
      BreakingBall.create(breaking_ball_params_with_season)

      render json: player_season, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
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
          .permit(:pitch_velocity, :control, :stamina, :w_risp, :heather, :vs_lbh,
                  :agile, :poise, :grit, :recovery, :special_ability
                  )
  end

  def breaking_ball_params
    params.require(:breaking_ball).map do |bb_params|
      bb_params.permit(:name, :direction, :variation, :is_original)
    end
  end
end
