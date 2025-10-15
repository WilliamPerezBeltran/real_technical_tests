class EvenNumber 
	attr_accessor :even_number_array

	def initialize even_number_array
		@evenNumberArray = even_number_array
	end
	
	def getEvenNumber
        return @evenNumberArray.select {|num| num%1==0 && num.to_i%2 == 0 }
	end
end

