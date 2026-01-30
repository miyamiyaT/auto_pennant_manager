module Players
  class SeasonPlayerByTeamYearPositionQuery
    def initialize(team_id:, year:, position_conditions:)
      @team_id = team_id
      @year = year
      @position_conditions = position_conditions
    end

    def call
      players = base_relation
      players = apply_position_filter(players)
      build_response(players)
    end

    private

    # 選手一覧のの取得
    def base_relation
      Player
        .where(team_id: @team_id, deleted_at: nil)
        .includes(player_seasons: [:batter_seasons, :pitcher_seasons])
        .where(player_seasons: { year: @year })
        .order('player_seasons.age DESC')
    end

    # ポジションフィルターの適用
    def apply_position_filter(players)
      players.where(
        @position_conditions
          .map { |c| "#{c} = true" }
          .join(' OR ')
      )
    end

    def build_response(players)
      players
        .select { |player| player.player_seasons.first.present? }
    end
  end
end 