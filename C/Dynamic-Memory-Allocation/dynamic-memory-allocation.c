// this code is meant to apply all the learnings from CS50's
// "Dynamic Memory Allocation" tutorial

#include <stdio.h>
#include <stdlib.h> // include this to use malloc


// this method is for
// getting the address or pointer of an integer variable
// then store it to a pointer variable
// also to calculate their sum
void add()
{
	// statically obtain integer
	int x = 1;
	int y = 2;
	int total = x + y;
	printf("%i + %i is %i\n", x, y, total);

	// dynamically obtain integer
	int* i = &x; // get the address or pointer of variable x
	int* j = &y; // get the address or pointer of variable y

	printf("%i + %i is %i\n", x, y, *i + *j);
}

// this method is for
// swapping values from two variables
void swap(int* x, int* y)
{
	int temp = *x;
	*x = *y;
	*y = temp;
}

// this method is for
// storing a list of numbers
void store_items(int* numbers, int length)
{
	for (int i = 0; i < length; i++)
	{
		printf("Store data at index %i: ", i);
		scanf("%i", &numbers[i]);
		printf("\n");
	}
}

// this method is for
// storing a string of name
// then capitalize the first letter
void capitalize()
{
	int length;
	printf("First name length: ");
	scanf("%i", &length);
	char* name = malloc(sizeof(char) * length);
	scanf("%s", name);
	if (name[0] >= 'a' && name[0] <= 'z')
	{
		name[0] = name[0] - ('a' - 'A');
	}
	printf("%s\n", name);
	free(name);
}

// this method is for
// simple arithmetic calculator
// which adds, minus, divide and multiply
void calculate()
{	
	char operator;
	int* left_operand = malloc(sizeof(int));
	int* right_operand = malloc(sizeof(int));
	int* result = malloc(sizeof(int));

	printf("Operator: ");
	scanf("%c", &operator);
	printf("Left Operand: ");
	scanf("%i", left_operand);
	printf("Right Operand: ");
	scanf("%i", right_operand);

	switch (operator)
	{
		case '+': *result = *left_operand + *right_operand;
			break;
		case '-': *result = *left_operand - *right_operand;
			break;
		case '/': *result = *left_operand / *right_operand;
			break;
		case '*': *result = *left_operand * *right_operand;
			break;
		default: printf("Not supported operator.\n");

	}

	printf("%i %c %i is %i\n", *left_operand, operator, *right_operand, *result);

	free(result);
	free(right_operand);
	free(left_operand);
}

int main(void)
{	
	// add begin
	// add();
	// add end

	// swap begin
	// int x = 1;
	// int y = 2;
	// printf("Before: x is %i and y is %i\n", x, y);
	// swap(&x, &y);
	// printf("After: x is %i and y is %i\n", x, y);
	// swap end

	// store_items begin
	// int length;
	// printf("How many values you want to input? ");
	// scanf("%i", &length);
	// printf("\n");
	// int* numbers = malloc(sizeof(int) * length);
	// store_items(numbers, length);

	// for (int i = 0; i < length; i++)
	// {
	// 	printf("numbers[%i]: %i\n", i, numbers[i]);
	// }

	// free(numbers);
	// store_items end

	// capitalize begin
	// capitalize();
	// capitalize end

	// calculate begin
	// calculate();
	// calculate end

	return 0;
}


