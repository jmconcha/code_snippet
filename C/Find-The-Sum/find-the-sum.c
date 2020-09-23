#include <stdio.h>


int main(void)
{
	int len = 20, uniquePairs[len], counter = 0, number;

	printf("Input: ");
	scanf("%i", &number);

	for (int i = 0; i < len; i++)
	{
		uniquePairs[i] = 0;
	}

	for (int j = 1; j < 9; j++)
	{
		for (int c = j+1; c < 10; c++)
		{
			if ((j + c) == number)
			{
				uniquePairs[counter++] = j;
				uniquePairs[counter++] = c;
			}
		}	
	}

	printf("Output: %i --> ", (counter / 2));
	for (int m = 0; m < counter; m += 2)
	{
		printf("(%i, %i), ", uniquePairs[m], uniquePairs[m+1]);
	}
	printf("\n");

	return 0;
}