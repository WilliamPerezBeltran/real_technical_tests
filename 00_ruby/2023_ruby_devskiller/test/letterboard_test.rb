require 'test_helper'

class LetterBoardTest < Minitest::Test
  def setup
    @letter_board = LetterBoard.new
  end

  # add additional test cases here of other patterns that concern you,
  # all test cases you add must pass

  def test_letterboard_with_cat
    test_board = %w[a z c t v a]
    word = 'cat'

    puts "Testing word #{word} in board #{test_board.join}"

    moves = @letter_board.solve(test_board, word)
    expected = [
      # c
      Move.new(Direction::LEFT),
      Move.new(Direction::LEFT),
      Move.new(Direction::LEFT, 'c'),
      # a
      Move.new(Direction::RIGHT),
      Move.new(Direction::RIGHT, 'a'),
      # t
      Move.new(Direction::LEFT),
      Move.new(Direction::LEFT, 't')
    ]

    assert_arr_equal_by_str expected, moves
  end

  def test_letterboard_with_tv
    test_board = %w[a z c t v a]
    word = 'tv'

    puts "Testing word #{word} in board #{test_board.join}"

    moves = @letter_board.solve(test_board, word)
    expected = [
      # t
      Move.new(Direction::RIGHT),
      Move.new(Direction::RIGHT),
      Move.new(Direction::RIGHT, 't'),
      # v
      Move.new(Direction::LEFT, 'v')
    ]

    assert_arr_equal_by_str expected, moves
  end

  def assert_arr_equal_by_str(exp, act)
    assert_equal exp.size, act.size, 'array sizes don\'t match'
    assert_equal exp.map(&:to_s), act.map(&:to_s), 'array contents\' to_s dont match'
  end

end
