module Players
  class BatterPositionQuery < BasePositionQuery
    private

    def position_map
      {
        'catcher'  => :is_catcher,
        'first'    => :is_first,
        'second'   => :is_second,
        'third'    => :is_third,
        'short'    => :is_short,
        'outfield' => :is_outfielder
      }
    end

    def default_columns
      position_map.values
    end
  end
end