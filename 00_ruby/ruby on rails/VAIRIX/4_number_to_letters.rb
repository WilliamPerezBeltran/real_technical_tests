# Convert a string of numbers to a sentence. Each number represents a letter.
# Numbers in the string are separated by a space and words in the sentence
# are separated by a plus character.
# Conversion table:

# 1 = A
# 2 = B
# 26 = Z

# Example: numbers_to_letters ('20 5 19 20+4 15 13 5) should return 'TEST DOME'.

def numbers_to_letters(string)
  words = string.split('+')

  msg = []
  words.each_with_index do |word, i|
    word.split(' ').each do |number|
      msg << ("A".."Z").to_a[ number.to_i - 1 ]
    end
    msg << " " unless i == words.length - 1
  end
  msg.join()
end

p numbers_to_letters('20 5 19 20+4 15 13 5') # => "TEST DOME"
