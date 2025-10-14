# Implement the symbolic to_octal function so that it converts a permission's
# symbolic notation into its octal notation.
# The string consists of 3 blocks of 3 characters each. The returned number will
# have three digits, one for each block. Each digit is the sum of all permissions
# present in the block:

def symbolic_to_octal(permission_string)
  permission_string = permission_string.split(//)

  permission_string.map! do |char|
    case char
    when 'r'
      4
    when 'w'
      2
    when 'x'
      1
    when '-'
      0
    end
  end

  permission_string.each_slice(3).map { |slice| slice.reduce(:+) }.join.to_i
end

puts symbolic_to_octal('rwxr-x-w-') # Should return 752
