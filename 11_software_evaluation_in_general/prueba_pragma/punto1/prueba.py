import pdb
# s="bcbcbcbcbcbc",t="bcbc"
# s="bcdbcdbcd",t="bcdbcd"
# s="bcdbcdbcdbcd",t="bcdbcd"
# s="lrbblrbb",t="lrbb"
def prueba(s="bcdbcdbcdbcd",t="bcdbcd"):
	if 2*t == s:
		while True:
			# pdb.set_trace()
			start_dividiv = 2
			range_dinamic = len(s)//start_dividiv
			init = 0
			final = start_dividiv
			pivote = None
			confirm = False

			for index, x in enumerate(range(range_dinamic)):
				if index == 0:
					pivote = s[init:final] 
				else:
					if pivote == s[init:final]:
						return len(pivote) 
				init += start_dividiv 
				final += start_dividiv 
	else:
		return -1

print(prueba())