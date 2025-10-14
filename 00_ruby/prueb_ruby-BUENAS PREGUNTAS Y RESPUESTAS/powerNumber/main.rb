require "./power_number_error.rb"
require "./power_number.rb"


class Main   
  def getStarted
      begin
        print "What is the base number? "
        base = gets.chomp
        print "What is the exponent number? "
        exponent = gets.chomp
        raise PowerNumberError if base.empty?
        raise PowerNumberError if exponent.empty?
        power = PowerNumber.new(base.to_i,exponent.to_i)
        puts power.getPowerNumber
      rescue PowerNumberError
        if base.empty? or exponent.empty?
          puts "Please fill all fields of the form. base empty or exponent empty"
          retry
        else
          raise
        end 
      end
  end
end

main = Main.new()
main.getStarted