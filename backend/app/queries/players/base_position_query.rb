module Players
  class BasePositionQuery
    def initialize(positions_param)
      @positions_param = positions_param
    end

    def call
      positions = @positions_param.to_s
                                   .split(',')
                                   .map(&:strip)
                                   .map(&:downcase)

      cols = positions.filter_map { |p| position_map[p] }

      cols.presence || default_columns
    end

    private

    # 子クラス必ず設定しないといけないもの
    def position_map
      raise NotImplementedError
    end

    def default_columns
      raise NotImplementedError
    end
  end
end