class Api::V1::BatterSeasonsController < ApplicationController
  def years
    year = Player.get_year_item(params[:id])

    render status: :ok, json: year
  end

  def show
    id = params[:id]
    year = params[:year]
    position_array = params[:positions].to_s.split(',').map(&:strip)

    # フィルタリング条件を生成
    position_conditions = []
    position_array.each do |position|
      case position.downcase
      when 'catcher'
        position_conditions << :is_catcher
      when 'first'
        position_conditions << :is_first
      when 'second'
        position_conditions << :is_second
      when 'third'
        position_conditions << :is_third
      when 'short'
        position_conditions << :is_short
      when 'outfield'
        position_conditions << :is_outfielder
      end
    end

    # positionsが指定されていない場合、どれか一つでもtrueのものを取得
    if position_conditions.empty?
      position_conditions = [
        :is_catcher,:is_first, :is_second, :is_third, :is_short, :is_outfielder
      ]
    end

    batter_season = Player.get_season_item(id, year, position_conditions)

    render status: :ok, json:{players: batter_season}
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
                  :fielding, :catching, :grit, :clutch, :vs_lhp, :stearing, 
                  :runnning, :throwing, :catcher, :grit, :recovery, :special_ability
                  )
  end
end
