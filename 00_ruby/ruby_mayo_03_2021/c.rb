class PowerNumberError < Exception
end
class PowerNumber 
	attr_reader :base, :exponent

	def initialize base,exponent
		@base = base
		@exponent = exponent
	end
	
	def getPowerNumber
	    power=1
	    for i in 1..@exponent
	        power=power*@base
	    end
	    return power 
	end
end

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
  if base.empty?
    puts "empty base"
    retry
  else
    raise
  end

  if exponent.empty?
    puts "empty exponent"
    retry
  else
    raise
  end
end

# power = PowerNumber.new(2,5)
# puts power.getPowerNumber