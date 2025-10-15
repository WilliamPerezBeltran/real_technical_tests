def ifPossible(num, arr)
  n = arr.length

  # Function to check if the array is sorted
  def sorted?(arr)
    arr == arr.sort
  end

  # Check if the array is already sorted
  return 100 if sorted?(arr)

  # Iterate through possible values of k
  (0..n-2).each do |k|
    # Cut the array at index k
    left_part = arr[0..k]
    right_part = arr[k+1..-1]

    # Check if pasting the right_part before left_part results in a sorted array
    if sorted?(right_part + left_part)
      return k
    end
  end

  # If no valid k is found, return -1
  -1
end

# Example usage:
puts ifPossible(6, [8, 10, 15, 35, 3, 7])  # Output: 3
