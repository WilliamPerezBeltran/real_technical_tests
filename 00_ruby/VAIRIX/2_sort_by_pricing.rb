# Implement the function sort_by_price_ascending, which:

# Accepts a string in JSON format, as in the example below.
# Orders items by price in ascending order.
# If two products have the same price, it orders them by their name in
# alphabetical order.
# Returns a string in JSON format that is equivalent to the one in the input
# format.

# For example, the call

# sort_by_price_ascending(' [{"name":"eggs", "price": 1}, {"name": "co
# ffee", "price":9.99}, {"name": "rice", "price": 4.04}]');

# should return

# [{"name":"eggs" ,"price": 1}, {"name":"rice", "price":4.04}, {"nam
# e" :"coffee", "price": 9.99}] '

require 'json'

def sort_by_price_ascending(json_string)
  products = JSON.parse(json_string)
  products.sort_by! { |product| [product["price"], product["name"]] }
  products.to_json
end

puts sort_by_price_ascending('[{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]')
