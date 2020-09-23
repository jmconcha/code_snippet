// this code is meant to apply all the learnings from CS50's
// "<Singly Linked List>" tutorial

#include <cs50.h>
#include <stdlib.h>
#include <stdio.h>

typedef struct node
{
	int number;
	struct node *next;
}
node;


int main(void)
{
	node *numbers = NULL;

	while (true)
	{
		int number = get_int("Enter number here: ");

		if (number == INT_MAX)
		{
			break;
		}

		bool found = false;

		for (node *ptr = numbers; ptr != NULL; ptr = ptr->next)
		{
			if (ptr->number == number)
			{
				found = true;
				break;
			}
		}

		if (!found)
		{
			node *n = malloc(sizeof(node));

			if (!n)
			{
				return 1;
			}

			n->number = number;
			n->next = NULL;

			if (numbers)
			{
				for (node *ptr = numbers; ptr != NULL; ptr = ptr->next)
				{
					if (ptr->next == NULL)
					{
						ptr->next = n;
						break;
					}
				}
			}
			else
			{
				numbers = n;
			}
		}
	}

	printf("\n\n");
	for (node *ptr = numbers; ptr != NULL; ptr = ptr->next)
	{
		printf("%i  ", ptr->number);
	}
	printf("\n");

	node *ptr = numbers;
	while (!ptr)
	{
		node *next = ptr->next;
		free(ptr);
		ptr = next;
	}

	return 0;
}