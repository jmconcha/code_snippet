// this code is meant to apply all the learnings from CS50's
// "<Linear Search>" tutorial

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
	bool exist = false;

	for (int i = 0, len = sizeof(book) / sizeof(string); i < len; i++)
	{
		if (strcmp(name, book[i]) == 0)
		{
			exist = true;
			break;
		}
	}
	
	if (exist)
		printf("Found\n");
	else
		printf("Not Found\n");
	return 0;
}