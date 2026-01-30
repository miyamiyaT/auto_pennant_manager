module Players
  class PitcherPositionQuery < BasePositionQuery
    private

    def position_map
      {
        'starter'  => :is_starter,
        'relief'    => :is_relief,
        'closer'   => :is_closer
      }
    end

    def default_columns
      position_map.values
    end
  end
end