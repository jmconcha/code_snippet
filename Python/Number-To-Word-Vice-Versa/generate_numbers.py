import random

file = open('numbers.txt', 'w')

for i in range(1001):
	file.write(str(i) + '\n')

file.close()