module Pitchers
  class BasePitcherQuery
    def initialize(player_id:)
      @player_id = player_id
    end

    def base_pitcher_relation
      Player
        .includes(player_seasons: [:pitcher_seasons, :pitcher_abilities, :breaking_balls])
        .find_by(id: @player_id, deleted_at: nil)
    end
  end
end 