numbers = ['fourteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'fourty', 'sixty',
		   'seventy', 'eighty', 'ninety','one', 'two', 'three', 'four', 'five', 'six',
		   'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fifteen',
		   'twenty', 'thirty', 'fifty', 'hundred', 'thousand']
#four, six, seven, eight, nine
#fourty, sixty, seventy, eighty, ninety
#fourteen, sixteen, seventeen, eighteen, nineteen

temp = 'ninethousandninehundredseventyseven'
print(temp)
result = []
order = []

for i in range(len(numbers)):
	while numbers[i] in temp:
		print(temp)
		f_index = temp.find(numbers[i])
		s_index = f_index + len(numbers[i])
		result.append(numbers[i])
		order.append(f_index)
		print(f_index)
		print(s_index)
		if f_index == 0:
			temp = temp[s_index:]
		else:
			temp = temp[:f_index] + temp[s_index:]
		if s_index == len(temp)-1:
			temp = temp[:f_index]

print(temp)	
print(result)
print(order)
print(' '.join(result))