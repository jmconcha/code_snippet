// this code is meant to apply all the learnings from CS50's
// "<Bubble Sort>" tutorial

#include <stdbool.h>
#include <stdio.h>

int main(void)
{
	printf("How many numbers? ");
	int len;
	scanf("%i", &len);
	int arr[len];

	for (int i = 0; i < len; i ++)
	{
		printf("Enter number at arr[%i]: ", i);
		scanf("%i", (arr + i));
	}
	
	printf("\n\nBefore Sorting:\n");
	for (int i = 0; i < len; i++)
	{
		printf("Number at arr[%i]: %i", i,  arr[i]);
		printf("\n");
	}

	if (len > 1)
	{	
		bool flag;
		do
		{
			flag = false;

			for (int i = 0; i < len - 1; i++)
			{
				if (arr[i] > arr[i+1])
				{
					int temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
					flag = true;
				}
			}
		}
		while (flag);
	}

	printf("\n\nAfter Sorting:\n");
	for (int i = 0; i < len; i++)
	{
		printf("Number at arr[%i]: %i", i,  arr[i]);
		printf("\n");
	}

	return 0;
}
