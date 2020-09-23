// this code is meant to apply all the learnings from CS50's
// "Functions" tutorial

/*
Practice Problem
	Declare and write a function called valid_triangle
	that takes three real numbers representing the lengths
	of the three sides of a triangle as its arguments, and
	ouputs either true or false, dependinig on whatever
	those three lengths are capable of making a triangle.

Note the following rules about triangles:
	A triangle may only have sides with positive length.
	The sum of the length of any two sides of the triangle must
	be greater than the length of the third side.
*/

#include <cs50.h>
#include <stdio.h>


// this method is for
// validating if three real numbers can create a triangle
// this is function declaration
bool valid_triangle(float a, float b, float c);

int main(void)
{
	// valid_triangle begin
	float a = get_int("Side A: ");
	float b = get_int("Side B: ");
	float c = get_int("Side C: ");
	
	if (valid_triangle(a, b, c))
		printf("Valid Triangle\n");
	else
		printf("Not A Valid Triangle\n");

	// valid_triangle end

	return 0;
}

// this method is for
// validating if three real numbers can create a triangle
// this is function definition
bool valid_triangle(float a, float b, float c)
{
	bool flag = false;

	if (a < 1 || b < 1 || c < 1)
		return flag;


	if (((a + b) > c) || ((a + c) > b) || ((c + b) > a))
		flag = true;

	return flag;

}