class Api::V1::PlayersController < ApplicationController
  def index
    render status: :ok, json:Player.get_all_team_items(params[:team_id])
  end

  def show
    render status: :ok, json:Player.find_by(id: params[:id])
  end

  def create
    ActiveRecord::Base.transaction do
      player = Player.new(player_params)
      player.is_active = true
      if player.save!
        player_season = PlayerSeason.new(player_season_params.merge(player_id: player.id))
  
        if player_season.save!
          render json: player_season, status: :created
        else
          render json: { error: player_season.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: player.errors.full_messages }, status: :unprocessable_entity
      end
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

  def calculate_age(birthday, year)
    return nil if birthday.blank? || year.blank?

    birth_date = Date.parse(birthday)
    current_year = Time.current.year
    
    age = current_year - birth_date.year
    age -= 1 if Time.current < Date.new(current_year, Date.parse(birthday).month, Date.parse(birthday).day)
    age
  end

  def player_params()
    params.require(:player)
          .permit(:team_id, :birthday, :name, :memo ,:is_favorite, :roy, 
                  :draft_year, :draft_rank, :draft_type)
  end

  def player_season_params()
    params.require(:player_season)
          .permit(:year, :number, :age,
                  :is_starter, :is_relief, :is_closer,
                  :is_catcher, :is_first, :is_second, :is_third,
                  :is_short, :is_outfielder)
  end
end
