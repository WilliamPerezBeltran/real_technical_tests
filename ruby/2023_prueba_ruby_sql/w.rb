input = [
  { 'id': 1, 'question_name': "What is your name?", 'question_value': "Jack"},
  { 'id': 2, 'question_name': "What is your hobby?", 'question_value': "Rugby"},
  { 'id': 3, 'question_name': "What is your name?", 'question_value': "Peter"},
  { 'id': 4, 'question_name': "What is your hobby?", 'question_value': "Tennis"},
  { 'id': 5, 'question_name': "What is your hobby?", 'question_value': "Basquetball"},
  { 'id': 6, 'question_name': "What is your hobby?", 'question_value': "Tennis"},
  { 'id': 7, 'question_name': "What is your hobby?", 'question_value': "Ping Pong"},
  { 'id': 8, 'question_name': "What is your hobby?", 'question_value': "Football"}
]

def output(input)
  output_hash = {}

  input.each do |item|
    id = item[:id]

    if item[:question_name] == "What is your name?"
      output_hash[item[:question_name]] ||= []
      output_hash[item[:question_name]] << { "id" => id, "value" => item[:question_value] }
    elsif item[:question_name] == "What is your hobby?"
      output_hash[item[:question_name]] ||= []
      output_hash[item[:question_name]] << { "id" => id, "value" => item[:question_value] }
      output_hash[item[:question_name]].uniq! { |entry| entry["value"] }
    end
  end

  output_hash
end

puts output(input)
