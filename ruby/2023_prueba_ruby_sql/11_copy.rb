def convert_array_to_output(input_array)
  output_hash = {}

  input_array.each do |item|
    question_name = item[:question_name]
    question_value = item[:question_value]
    id = item[:id]

    if question_name == "What is your name?"
      output_hash[question_name] ||= []
      output_hash[question_name] << { "id" => id, "value" => question_value }
    elsif question_name == "What is your hobby?"
      output_hash[question_name] ||= []
      output_hash[question_name] << { "id" => id, "value" => question_value }
      output_hash[question_name].uniq! { |entry| entry["value"] }
    end
  end

  output_hash
end

input_array = [
  { 'id': 1, 'question_name': "What is your name?", 'question_value': "Jack"},
  { 'id': 2, 'question_name': "What is your hobby?", 'question_value': "Rugby"},
  { 'id': 3, 'question_name': "What is your name?", 'question_value': "Peter"},
  { 'id': 4, 'question_name': "What is your hobby?", 'question_value': "Tennis"},
  { 'id': 5, 'question_name': "What is your hobby?", 'question_value': "Basquetball"},
  { 'id': 6, 'question_name': "What is your hobby?", 'question_value': "Tennis"},
  { 'id': 7, 'question_name': "What is your hobby?", 'question_value': "Ping Pong"},
  { 'id': 8, 'question_name': "What is your hobby?", 'question_value': "Football"}
]

output = convert_array_to_output(input_array)
puts output