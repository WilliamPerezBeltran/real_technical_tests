# s = "()))"
s = "()()()()()()()()()()"
s = "()))"

def prueba(s):
	item_to_compare = s[0:2]
	init = 0
	final = 2
	for index,x in enumerate(range(0,len(s),2)):
		if item_to_compare == s[init:final]:
			b_structure = True
		else:
			b_structure = False

		init += 2
		final += 2
		
	if b_structure:
		return 0
	else:
		count = 0
		for index, x in enumerate(list(s)):
			if s[0] == '(':
				pass
			if index != 0 and s[index] == ')':
				print("dfasf")
				count +=1
		return count-1

print(prueba(s))