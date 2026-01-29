class TeamPlayerSerializer
  include Alba::Resource

  one :team

  many :active_players, resource: PlayerSerializer
  many :retire_players, resource: PlayerSerializer

  attribute :season_list do |resource|
    resource[:season_list]
  end
end