input = [
  { 'id': 1, 'name': "What is your name?", 'value': "Jack"},
  { 'id': 2, 'name': "What is your hobby?", 'value': "Rugby"},
  { 'id': 3, 'name': "What is your name?", 'value': "Peter"},
  { 'id': 4, 'name': "What is your hobby?", 'value': "Tennis"}
]

def convert(input)
  output = {}

  input.each do |item|
    output[item[:name]] ||= []
    output[item[:name]] << { "id" => item[:id], "value" => item[:value] }
  end

  output
end

output = convert(input)
puts output