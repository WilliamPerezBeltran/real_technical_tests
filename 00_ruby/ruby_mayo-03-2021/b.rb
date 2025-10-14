class User
    attr_accessor :name, :friends

    def initialize(name, friends)
        @name = name
        @friends = friends
    end

    def friendNbr
        return friends.count
    end

    def isFriendWith(value)
        friends.each do |friend_name|
            if (friend_name == value)
                return "Yes, #{name} is friend with #{friend_name}"
            end
        end

        return "No, #{name} is not friend with #{friend_name}"
    end
end

jane = User.new("Jane", ["Boris", "Francois", "Carlos", "Alice"])

bob = User.new("Bob", ['Jane', 'Boris', 'Missy'])

alice = User.new("Alice", ['Bob', 'Jane'])


puts bob.isFriendWith("Jane")



class PowerNumber 
    def getPowerNumber(a,b)
        power=1
        for i in 1..b
            power=power*a
        end
        return power 
    end
end

power = PowerNumber.new()

puts power.getPowerNumber(2,5)


class PersonNameError < Exception
end
class Person
  attr_reader :name

  def initialize name
    @name = name
  end
end

begin
  print "What is your name? "
  name = gets.chomp
  raise PersonNameError if name.empty?
  person = Person.new(name)
rescue PersonNameError
  if name.empty?
    puts "You can not have a name that is ''"
    retry
  else
    raise
  end
end

puts person.name