// this code is meant to apply all the learnings from CS50's
// "<Lecture 3 - Algorithm and Binary Search>" tutorial
// iterative binary search

#include <cs50.h>
#include <stdio.h>
#include <string.h>

string book[] = {
    "Chen",
    "Kernighan",
    "Leitner",
    "Lewis",
    "Malan",
    "Muller",
    "Seltzer",
    "Shieber",
    "Smith"
};

int main(void)
{
	string name = get_string("Name: ");
	
	int left = 0, right = sizeof(book) / sizeof(string) - 1;

	while(left <= right) {
		int middle = (left + right) / 2;

		if (strcmp(name, book[middle]) == 0)
		{
			printf("Calling %s.\n", book[middle]);
			return 0;
		}
		
		else if (strcmp(name, book[middle]) < 0)
			right = middle - 1;

		else if (strcmp(name, book[middle]) > 0)
			left = middle + 1;
	}

	printf("Quitting...\n");
	return 0;
}