'''
nine thousand nine hundred ninety nine
9 * 1000 + 9 * 100 + 90 + 9
'''

import sys

words = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8,
		 'nine': 9, 'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
		 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'ten': 10,
		 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50,  'sixty': 60, 'seventy': 70,
		 'eighty': 80, 'ninety': 90, 'thousand': 1000, 'hundred': 100}


def translate(word):
	# word = sys.argv[1]
	word_list = word.split()
	print(word_list)

	if 'thousand' in word_list:
		result = words[word_list[0]] * 1000 + words[word_list[2]] * 100 + words[word_list[4]] + words[word_list[5]]
		print(type(result))
		print(result)

file = open('output.txt')
while file.readline() != '':
	translate(file.readline())
