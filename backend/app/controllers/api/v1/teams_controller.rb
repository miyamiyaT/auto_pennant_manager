class Api::V1::TeamsController < ApplicationController

  def index
    render status: :ok, json:Team.get_all_items
  end

  def show
    data = {
      team: Team.get_item(params[:id]),
      active_players: Players::ActivePlayerByTeamQuery.new(team_id: params[:id]).call,
      retire_players: Players::RetirePlayerByTeamQuery.new(team_id: params[:id]).call,
      season_list: Teams::AllSeasonByTeamQuery.new(team_id: params[:id]).call
    }

    render status: :ok, json: TeamPlayerSerializer.new(data).serialize
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
