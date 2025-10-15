import pdb
import os

os.system("clear")

def prueba(arr = [5,2,5,8]):
	


	if arr[1:] == arr[:-1]:
		return len(arr)
	else:
		count_odd = 0
		count_balance = 0
		count_even = 0
		count_balance_even = 0
		for index, item in enumerate(arr):
			if index % 2 == 0:
				count_odd+=item
				print(index, item,count_odd)
			else:
				count_even+=item
			# pdb.set_trace()

			if count_odd == count_even:
				count_balance+=1

		return count_balance*2




		# if count_odd == count_even:
		# 	print(count_odd)
		# 	return "balance"
	

print(prueba())