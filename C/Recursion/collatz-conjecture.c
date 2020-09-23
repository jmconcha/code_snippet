// this code is meant to apply all the learnings from CS50's
// "Recursion" tutorial

#include <stdio.h>


// this method is for
// implementation of collatz conjecture
// using recursion
int collatz_conjecture(int pos_num)
{
	// Collatz Conjecture Pseudocode
	// if n is 1 stop
	// otherwise, if n is even, repeat this process on n / 2
	// otherwise, if n is odd, repeat this process on 3n + 1

	if (pos_num == 1)
		return 0;

	if (pos_num % 2)
		return 1 + collatz_conjecture(3 * pos_num + 1);
	else
		return 1 + collatz_conjecture(pos_num / 2);

}

int main(void)
{
	// samp1 begin
	int pos_num;

	do
	{
		printf("Enter positive number: ");
		scanf("%i", &pos_num);
	}
	while (pos_num < 1);

	printf("Steps: %i\n", collatz_conjecture(pos_num));
	// samp1 end

	return 0;
}