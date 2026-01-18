class PlayerSerializer
  include Alba::Resource

  attributes :id, :name, :memo, :is_active, :is_favorite, :roy, :draft_year, :draft_type, :draft_rank
end