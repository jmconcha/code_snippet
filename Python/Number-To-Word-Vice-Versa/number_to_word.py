# import sys

ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
# between ones and tens
boat = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
						 'seventeen', 'eighteen', 'nineteen']
tens = ['', 'ten', 'twenty', 'thirty', 'fourty', 'fifty',  'sixty', 'seventy', 'eighty','ninety']
other = ['hundred', 'thousand']

def thousand(number):
	quotient = int(number) // 1000
	return ones[quotient] + ' thousand ' + hundred(number[1:]) + ' '

def hundred(number):
	quotient = int(number) // 100
	temp = 'hundred' if quotient > 0 else ''
	return ones[quotient] + f' {temp} ' + ten(number[1:]) + ' '

def ten(number):
	quotient = int(number) // 10
	remainder = int(number) % 10

	if remainder == 0:
		return tens[quotient]  + ' '
	elif quotient == 1:
		return boat[remainder]  + ' '
	else:
		return tens[quotient] + ' ' + one(number[1:])  + ' '

def one(number):
	if number == '0':
		return 'zero'
	return ones[int(number)]

translate = [one, ten, hundred, thousand]

# def translate(number):
# 	# number = str(int(sys.argv[1]))

# 	if len(number) == 4:
# 		result = thousand(number)
# 	if len(number) == 3:
# 		result = hundred(number)
# 	if len(number) == 2:
# 		result = ten(number)
# 	if len(number) == 1:
# 		result = one(number)

# 	return result
# 	# print(f'Output: {result}')

file = open('output.txt', 'w')
for i in range(10000):
	# file.write(f'{i} \t {translate[len(str(i))-1](str(i))}\n')
	file.write(f'{translate[len(str(i))-1](str(i))}\n')


