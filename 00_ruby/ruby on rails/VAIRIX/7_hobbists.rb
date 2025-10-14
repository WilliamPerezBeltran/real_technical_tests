# Implement the find_all_hobbyists function that takes a hobby, and an object
# consisting of peoples names mapped to their respective hobbies. The
# function should return an Array containing the names of the people (in any
# order) that enjoy the hobby.

# For example, the following code should display the name 'Chad'.

# hobbies = Pa
# "Steve" => ['Fashion', 'Piano', 'Reading'1,
# "Patty" ['Drama' 'Magic', Pets'l,
# "Chad" => ['Puzzles' 'Pets', 'Yoga' ]
# }

# puts find_all_hobbyists ('Yoga', hobbies)

def find_all_hobbyists(hobby, hobbies)
  hobbies.select { |_, v| v.include?(hobby) }.keys
end

hobbies = {
    "Steve" => ['Fashion', 'Piano', 'Reading'],
    "Patty" => ['Drama', 'Magic', 'Pets'],
    "Chad" => ['Puzzles', 'Pets', 'Yoga']
}

puts find_all_hobbyists('Yoga', hobbies)
