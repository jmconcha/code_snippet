import sys

if len(sys.argv) > 1:
	number = int(sys.argv[1])
	unique_pairs = []
	for i in range(1, 9):
		for j in range(i+1, 10):
			if i + j == number:
				unique_pairs.append((i, j))
	print(f'Input: {number}\nOutput: {len(unique_pairs)} --> {unique_pairs}')
else:
	print('Missing Argument')