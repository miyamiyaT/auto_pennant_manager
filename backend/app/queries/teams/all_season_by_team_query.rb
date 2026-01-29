module Teams
  class AllSeasonByTeamQuery
    def initialize(team_id:)
      @team_id = team_id
    end

    def call
    Team
      .joins(players: :player_seasons)
      .where(players: { team_id: @team_id, deleted_at: nil })
      .distinct
      .pluck('player_seasons.year')
      .map(&:to_i)
      .sort
    end
  end
end 