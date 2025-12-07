class Player < ApplicationRecord
  acts_as_paranoid

  # バリデーション
  validates :name, length: { maximum: 10 }, presence: true
  validates :birthday, presence: true, format: { with: /\A\d{4}-\d{2}-\d{2}\z/ }
  validates :is_favorite, inclusion: { in: [true, false] }
  validates :is_active, inclusion: { in: [true, false] }
  validates :memo, presence: false
  validates :deleted_at, absence: true

  # アソシエーション
  belongs_to :team
  has_many :player_season, dependent: :destroy

  # 削除
  def delete_item
    update(deleted_at: Time.current)
  end

  # 現役選手一覧取得
  def self.get_all_team_items(id, is_active)
    player_list = self.where(team_id: id, is_active: is_active, deleted_at: nil)
                      .left_joins(:player_season)
                      .select('players.*, COUNT(player_seasons.id) AS season_count')
                      .group('players.id')
                      .order('players.birthday ASC')
                      .order('season_count DESC')
                      .includes(player_season: [:batter_season, :pitcher_season])    

    player_list.map do |player|
      {
        id: player.id,
        name: player.name,
        birthday: player.birthday,
        is_favorite: player.is_favorite,
        is_active: player.is_active,
        roy: player.roy,
        draft_year: player.draft_year,
        draft_type: player.draft_type,
        draft_rank: player.draft_rank,
        memo: player.memo,
        season_count: player.player_season.size,
        is_batter: player.player_season.any? { |season| season.batter_season.present? },
        is_pitcher: player.player_season.any? { |season| season.pitcher_season.present? }
      }
    end
  end

  def self.get_season_item(id, year, position_conditions)

    player_list = self.where(team_id: id, deleted_at: nil)
                      .includes(player_season: [:batter_season, :pitcher_season])
                      .where(player_season: { year: year },)
                      .order('player_season.age DESC')

    # フィルタリング
    if position_conditions.present?
      player_list = player_list.where(
        position_conditions.map { |condition| "#{condition} = true" }.join(' OR ')
      )
    end


    player_list.map do |player|
      player_season = player.player_season.first
      batter_season = player_season ? player_season.batter_season.first : nil
      pitcher_season = player_season ? player_season.pitcher_season.first : nil

      {
        id: player.id,
        name: player.name,
        is_active: player.is_active,
        player_season: player_season,
        batter_season: batter_season,
        pitcher_season: pitcher_season
      }
    end
  end

  def self.get_batter_item(id)
  player_list = self.where(id: id, deleted_at: nil)
                    .includes(player_season: [:batter_season, :batter_ability])
                    .order('player_seasons.year DESC')

  player_list.map do |player|
    player_seasons = player.player_season

    player_season_data = player_seasons.map do |player_season|
      batter_season = player_season ? player_season.batter_season.first : nil
      batter_ability = player_season ? player_season.batter_ability.first : nil

      {
        id: player_season.id,
        year: player_season.year,
        age: player_season.age,
        memo: player_season.memo,
        growth_type: player_season.growth_type,
        current_growth_type: player_season.current_growth_type,
        is_starter:player_season.is_starter,
        is_relief:player_season.is_relief,
        is_closer:player_season.is_closer,
        is_catcher:player_season.is_catcher,
        is_first:player_season.is_first,
        is_second:player_season.is_second,
        is_third:player_season.is_third,
        is_short:player_season.is_short,
        is_outfielder:player_season.is_outfielder,
        batter_season: batter_season,
        batter_ability: batter_ability
      }
    end

    {
      id: player.id,
      name: player.name,
      memo: player.memo,
      is_active: player.is_active,
      is_favorite: player.is_favorite,
      roy: player.roy,
      draft_year: player.draft_year,
      draft_type: player.draft_type,
      draft_rank: player.draft_rank,
      player_seasons: player_season_data
    }
    end
  end
  
  def self.get_batter_last_item(id)
    player_list = self.where(id: id, deleted_at: nil)
                      .includes(player_season: [:batter_season, :batter_ability])
                      .order('player_seasons.year DESC')
  
    player_list.map do |player|
      # player_seasonsを年度の降順でソートし、最初のレコードだけを取得
      latest_player_season = player.player_season.order(year: :desc).first
  
      if latest_player_season
        batter_season = latest_player_season.batter_season.first
        batter_ability = latest_player_season.batter_ability.first
  
        player_season_data = {
          year: latest_player_season.year,
          age: latest_player_season.age,
          memo: latest_player_season.memo,
          growth_type: latest_player_season.growth_type,
          current_growth_type: latest_player_season.current_growth_type,
          is_starter: latest_player_season.is_starter,
          is_relief: latest_player_season.is_relief,
          is_closer: latest_player_season.is_closer,
          is_catcher: latest_player_season.is_catcher,
          is_first: latest_player_season.is_first,
          is_second: latest_player_season.is_second,
          is_third: latest_player_season.is_third,
          is_short: latest_player_season.is_short,
          is_outfielder: latest_player_season.is_outfielder,
          batter_season: batter_season,
          batter_ability: batter_ability
        }
      end
  
      {
        id: player.id,
        name: player.name,
        memo: player.memo,
        birthday: player.birthday,
        is_active: player.is_active,
        player_seasons: player_season_data ? [player_season_data] : []
      }
    end
  end

  # 投球関連
  def self.get_pitcher_item(id)
    player_list = self.where(id: id, deleted_at: nil)
                      .includes(player_season: [:pitcher_season, :pitcher_ability, :breaking_ball])
                      .order('player_seasons.year DESC')
  
    player_list.map do |player|
      player_seasons = player.player_season
  
      player_season_data = player_seasons.map do |player_season|
        pitcher_season = player_season ? player_season.pitcher_season.first : nil
        pitcher_ability = player_season ? player_season.pitcher_ability.first : nil
        breaking_ball = player_season ? player_season.breaking_ball : nil
  
        {
          id: player_season.id,
          year: player_season.year,
          age: player_season.age,
          memo: player_season.memo,
          growth_type: player_season.growth_type,
          current_growth_type: player_season.current_growth_type,
          is_starter:player_season.is_starter,
          is_relief:player_season.is_relief,
          is_closer:player_season.is_closer,
          is_catcher:player_season.is_catcher,
          is_first:player_season.is_first,
          is_second:player_season.is_second,
          is_third:player_season.is_third,
          is_short:player_season.is_short,
          is_outfielder:player_season.is_outfielder,
          pitcher_season: pitcher_season,
          pitcher_ability: pitcher_ability,
          breaking_ball: breaking_ball
        }
      end
  
      {
        id: player.id,
        name: player.name,
        memo: player.memo,
        is_active: player.is_active,
        is_favorite: player.is_favorite,
        roy: player.roy,
        draft_year: player.draft_year,
        draft_type: player.draft_type,
        draft_rank: player.draft_rank,
        player_seasons: player_season_data
      }
      end
    end
    
    def self.get_pitcher_last_item(id)
      
      player_list = self.where(id: id, deleted_at: nil)
                        .includes(player_season: [:pitcher_season, :pitcher_ability, :breaking_ball])
                        .order('player_seasons.year DESC')

      player_list.map do |player|
      # player_seasonsを年度の降順でソートし、最初のレコードだけを取得
      latest_player_season = player.player_season.order(year: :desc).first

      if latest_player_season
        pitcher_season = latest_player_season.pitcher_season.first
        pitcher_ability = latest_player_season.pitcher_ability.first
        breaking_ball = latest_player_season.breaking_ball

        player_season_data = {
          id: latest_player_season.id,
          year: latest_player_season.year,
          age: latest_player_season.age,
          memo: latest_player_season.memo,
          growth_type: latest_player_season.growth_type,
          current_growth_type: latest_player_season.current_growth_type,
          is_starter: latest_player_season.is_starter,
          is_relief: latest_player_season.is_relief,
          is_closer: latest_player_season.is_closer,
          is_catcher: latest_player_season.is_catcher,
          is_first: latest_player_season.is_first,
          is_second: latest_player_season.is_second,
          is_third: latest_player_season.is_third,
          is_short: latest_player_season.is_short,
          is_outfielder: latest_player_season.is_outfielder,
          pitcher_season: pitcher_season,
          pitcher_ability: pitcher_ability,
          breaking_ball: breaking_ball
        }
      end
  
      {
        id: player.id,
        name: player.name,
        memo: player.memo,
        birthday: player.birthday,
        is_active: player.is_active,
        player_seasons: player_season_data ? [player_season_data] : []
      }
    end
  end
      
  # 詳細取得
  def self.get_year_item(id)
    player_list = self.where(team_id: id, deleted_at: nil)
                      .includes(:player_season)

    all_years = player_list.flat_map { |player| player.player_season.map(&:year) }
                           .uniq
                           .map(&:to_i)                    # 文字列から整数に変換（整数でソートするため）
                           .sort.reverse                  # 昇順にソートし、反転して最新順にする
                           .map(&:to_s)                    # 元の文字列に戻す

    latest_year = all_years.max
    {years: all_years, latest_year: latest_year}
  end
end
