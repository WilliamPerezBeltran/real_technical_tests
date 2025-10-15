**note:** *you are given more time than needed to solve the problem, please also pay attention to code quality, structure, and tests.  Please use your normal IDE/Editor for development, you can use the Git interface to do so.*

## Letter Board

We are playing a word game where you form words from letters with specific rules.

You start with a series of letter tiles sitting in a horizontal rack.  You need to use these letters to form a word. You can only take a letter from the far left end, or the far right end.  Any letter that is not the next letter you are seeking, must be inserted back on the opposite end.  Letters that match the next letter you are seeking are removed from the board permanently. 

The goal is to find the most optimal order (fewest moves) to collect the letters in order for the target word.  But thankfully you will not have to decide on the strategy to guarantee this outcome and can just use the following rules and strategy:

### Rules

1.  You search for letters in the word, in order, one at a time
2.  You can only remove one letter from the left, or the rigth side of the board
3.  A removed letter that is not the letter you are seeking is placed back onto the board at the opposite end (effectively rotating the board)
4.  A letter that you are seeking is removed from the board, and is added to your word.
5.  When deciding whether to take from the left or the right side of the board, always choose the side that is closest to the letter you are seeking, and if a letter is same distance from both sides (a tie), take from the LEFT.
6.  Do not worry about validating input, the board will always contain enough letters to solve for a tested word.

### Example 1

```
example word:  "cat"
board:  [ 'a', 'z', 'c', 't', 'v', 'a' ]
```

Based on the rules/strategy above, the following is a walk through of the example being solved:

```
board starts as: [ 'a', 'z', 'c', 't', 'v', 'a' ]
```

looking for the `'c'` in "cat", found it 3 from the LEFT (closer than 4 from the RIGHT), therefore...

```
LEFT       => [ 'z', 'c', 't', 'v', 'a', 'a' ]
LEFT       => [ 'c', 't', 'v', 'a', 'a', 'z' ]
LEFT  "c"  => [ 't', 'v', 'a', 'a', 'z' ]

board is now: [ 't', 'v', 'a', 'a', 'z' ]
```

now looking for `'a'` in "cat", found it 2 from the RIGHT, which is closer than 3 from the LEFT, therefore...

```
RIGHT      => [ 'z', 't', 'v', 'a', 'a' ]
RIGHT "a"  => [ 'z', 't', 'v', 'a' ]

Board is now: [ 'z', 't', 'v', 'a' ]
```

now looking for `'t'` in "cat", found it 2 from the LEFT, which is closer than 3 from the RIGHT, so...

```
LEFT       => [ 't', 'v', 'a', 'z' ]
LEFT  "t"  => [ 'v', 'a', 'z' ]
```

Therefore the resulting moves are:

```
LEFT, LEFT, LEFT:c, RIGHT, RIGHT:a, LEFT, LEFT:t
```

And move that does not capture a letter will leave that part of the structure empty, or in this case a `Move::EMPTY_LETTER` (which is a `'0'`) represents no letter and is omitted. See further comments in `types.rb` file.

### Example 2

```
2nd example word: "tv"
2nd board:  [ 'a', 'z', 'c', 't', 'v', 'a' ]
```

This is the same board, but with a different word, and would result in the following moves:

```
RIGHT, RIGHT, RIGHT:t, LEFT:v
```

## Getting started:

In the code, please review all of the source files, focusing on `lib/letterboard.rb` for the placeholder function that you must implement. `lib/types.rb` for data types you will be using for input parameters and return values. And please review the `test/test_letterboard.rb` for tests that must pass based on the examples given here.  You may add additional test cases if you wish, but they must pass or your score will be affected.

See `.ruby-version` file for the expected version of Ruby that you should use.  You may use newer versions as long as the code is compatible.

### Installing

To install dependencies:

```
bundle install
```

note:  the project sets the bundle path to vendor/bundle

### Running tests:

To run tests:

```
bundle exec rake test
```

