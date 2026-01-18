module Batters
  class BaseBatterQuery
    def initialize(player_id:)
      @player_id = player_id
    end

    def base_batter_relation
      Player
        .includes(player_seasons: [:batter_seasons, :batter_abilities])
        .find_by(id: @player_id, deleted_at: nil)
    end
  end
end 