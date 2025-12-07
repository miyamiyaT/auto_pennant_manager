class Api::V1::TeamSeasonsController < ApplicationController

  def index
  end

  def show
    position_conditions = [
      :is_starter, :is_relief, :is_closer,
      :is_catcher,:is_first, :is_second, :is_third, :is_short, :is_outfielder
    ]
    active_players = Player.get_season_item(params[:id], params[:year], position_conditions)

    render status: :ok, json:{team: active_players}
  end


  def create
    post = Team.new(team_params)
    if post.save
      render json: post, status: :created
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post, status: :ok
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end


  def delete; end

  private

  def team_params
    params.require(:team).permit(:sponsor, :name)
  end
end