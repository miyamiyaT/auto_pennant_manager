module Players
  class ActivePlayerByTeamQuery
    def initialize(team_id:)
      @team_id = team_id
    end

    def call
      Player.where(team_id: @team_id, is_active: true, deleted_at: nil)
        .includes(player_seasons: [:batter_seasons, :pitcher_seasons])    
        .order('players.birthday ASC')
    end
  end
end 