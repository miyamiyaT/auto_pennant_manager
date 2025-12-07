class Api::V1::TeamsController < ApplicationController

  def index
    render status: :ok, json:Team.get_all_items
  end

  def show
    team = Team.get_item(params[:id])
    year = Player.get_year_item(params[:id])
    active_players = Player.get_all_team_items(params[:id], true)
    retire_players = Player.get_all_team_items(params[:id], false)
    season_list = Team.get_all_years(params[:id])

    render status: :ok, json:{team: team, 
                              year: year,
                              active_players: active_players,
                              retire_players: retire_players,
                              season_list: season_list}
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
