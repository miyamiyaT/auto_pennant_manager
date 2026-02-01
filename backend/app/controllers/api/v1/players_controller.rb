class Api::V1::PlayersController < ApplicationController
  def index
    render status: :ok, json:Player.get_all_team_items(params[:team_id])
  end

  def show
    render status: :ok, json:Player.find_by(id: params[:id])
  end

  def create
  player_season =
    Players::CreatePlayerUseCase.new(
      player_params: player_params,
      player_season_params: player_season_params
    ).call

    render json: player_season, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
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
          .permit(:team_id, :birthday, :name, :memo ,:is_favorite, :roy, 
                  :draft_year, :draft_rank, :draft_type)
  end

  def player_season_params()
    params.require(:player_season)
          .permit(:year, :age, :growth_type, :current_growth_type,
                  :is_starter, :is_relief, :is_closer,
                  :is_catcher, :is_first, :is_second, :is_third,
                  :is_short, :is_outfielder)
  end
end
