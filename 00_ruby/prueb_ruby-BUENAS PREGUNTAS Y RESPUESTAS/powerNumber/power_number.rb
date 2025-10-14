class PowerNumber 
	attr_accessor :base, :exponent

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