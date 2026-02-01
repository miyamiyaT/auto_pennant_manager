module Players
  class CreatePlayerUseCase
    def initialize(player_params:, player_season_params:)
      @player_params = player_params
      @player_season_params = player_season_params
    end

    def call
      ActiveRecord::Base.transaction do
        player = Player.create!(
          @player_params.merge(is_active: true)
        )

        PlayerSeason.create!(
          @player_season_params.merge(player_id: player.id)
        )

        player
      end
    end
  end
end