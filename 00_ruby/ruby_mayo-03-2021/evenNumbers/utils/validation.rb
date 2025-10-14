class ValidateEntry 
	attr_accessor :data
	def initialize data
		@evenNumberArray = data
		self.dataType data
		self.dataType data
	end

	def dataType(data)
		if data !~ /\D/ 
			return Integer 			
		end
	end
	
	def validateArray
		return @evenNumberArray.kind_of?(Array)
	end

	def validateDataFloat
		return @evenNumberArray.all? {|i| i.is_a?(Float) }
	end

	def number?(obj)
		obj = obj.to_s unless obj.is_a? String
		/\A[+-]?\d+(\.[\d]+)?\z/.match obj
	end

end

