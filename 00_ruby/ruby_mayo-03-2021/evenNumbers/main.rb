require "./even_number_error.rb"
require "./even_number.rb"
require "./utils/validation.rb"

class Main   
  def getStarted
      begin
        print "Give a array of float numbers"
        arrayOfFloatNumbers = gets.chomp
        raise EvenNumberError if arrayOfFloatNumbers.empty?
        evenNumbers = EvenNumber.new(eval(arrayOfFloatNumbers))
        puts evenNumbers.getEvenNumber
      rescue EvenNumberError
        if arrayOfFloatNumbers.empty? 
          puts "The field is empthy please fill it with a array of float numbers"
          retry
        else
          raise
        end 
      end
  end
end

main = Main.new()
main.getStarted

[1.5,2.0]