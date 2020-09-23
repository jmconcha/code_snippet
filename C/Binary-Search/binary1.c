// this code is meant to apply all the learnings from CS50's
// "<Lecture 3 - Algorithm and Binary Search>" tutorial
// recursively binary search

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

bool binary_search(string name, string book[], int left, int right);

int main(void)
{	
	string name = get_string("Name: ");
	
	if (binary_search(name, book, 0, sizeof(book) / sizeof(string) - 1))
	{
		printf("Found\n");
	}
	else{
		printf("Not Found\n");
	}

	return 0;
}

bool binary_search(string name, string book[], int left, int right)
{

	if (left > right)
		return false;

	int middle = (left + right) / 2;

	if (strcmp(name, book[middle]) == 0)
		return true;

	else if (strcmp(name, book[middle]) < 0)
		return binary_search(name, book, left, middle - 1);

	else if (strcmp(name, book[middle]) > 0)
		return binary_search(name, book, middle + 1, right);

}