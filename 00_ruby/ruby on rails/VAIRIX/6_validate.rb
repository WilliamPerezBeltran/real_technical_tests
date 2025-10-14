# Implement the validate function, which accepts a username and returns true if
# it's acceptable and false if it's not.

# A username is valid if it satisfies the following rules:
# The username must be at least 4 characters long.
# The username must contain only letters, numbers and optionally one
# underscore L).
# The username must start with a letter, and must not end with an underscore.

# For example, validate?("Mike Standish"); would return false because it contains
# a space.

def validate?(username)
  return false if username.split(//).tally.keys['_'] > 1

  username =~ /^[a-z][a-z0-9_]{3,16}[a-z0-9]$/i ? true : false
end

puts validate?('Mike__Standish') # Valid username
# puts validate?('Mike Standish') # Invalid username
# puts validate?('Mike Standish_') # Invalid username
# puts validate?('Mike4_Standis2h') # Valid username
