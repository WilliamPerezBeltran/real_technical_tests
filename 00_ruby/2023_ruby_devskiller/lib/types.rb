class Move
  
  attr_reader :direction
  attr_reader :letter
  
  EMPTY_LETTER = '0'.freeze

  # Direction is either Direction::LEFT or Direction::RIGHT
  # For the move that doesn't capture a letter, use the EMPTY_LETTER as a letter
  def initialize(direction, letter = Move::EMPTY_LETTER)
    @direction = direction
    @letter = letter
  end

  def to_s
    if @letter == EMPTY_LETTER
      @direction.to_s
    else
      "#{@direction}:#{@letter}"
    end
  end
end

module Direction
  LEFT = :LEFT
  RIGHT = :RIGHT
end
