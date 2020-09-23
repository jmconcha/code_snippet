// this code is meant to apply all the learnings from CS50's
// "<Structures>" tutorial

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct car {
	int year;
	char model[10];
	char plate[7];
	int odometer;
	int engine_size;
};

void samp1();
void samp2();
void samp3();

int main(void)
{
	// samp1 begin
	samp1();
	// samp1 end
	printf("\n");
	// samp2 begin
	samp2();
	// samp2 end
	printf("\n");
	// samp3 begin
	samp3();
	// samp3 end

	return 0;
}

// static struct
void samp1()
{
	struct car mycar;
	mycar.year = 2020;
	strcpy(mycar.plate, "MC");
	mycar.odometer = 50000;

	printf("Year: %i\n", mycar.year);
	printf("Plate: %s\n", mycar.plate);
	printf("Odometer: %i\n", mycar.odometer);
}

// dynamic struct
void samp2()
{
	struct car *mycar = malloc(sizeof(struct car));
	(*mycar).year = 2021;
	strcpy((*mycar).plate, "Mc");
	(*mycar).odometer = 50001;

	printf("Year: %i\n", (*mycar).year);
	printf("Plate: %s\n", (*mycar).plate);
	printf("Odometer: %i\n", (*mycar).odometer);
	
	free(mycar);
}

// dynamic struct
// using arrow (->) operator to access fields
void samp3()
{
	struct car *mycar = malloc(sizeof(struct car));
	mycar->year = 2022;
	strcpy(mycar->plate, "mc");
	mycar->odometer = 50002;

	printf("Year: %i\n", mycar->year);
	printf("Plate: %s\n", mycar->plate);
	printf("Odometer: %i\n", mycar->odometer);
	
	free(mycar);
}