// this code is meant to apply all the learnings from CS50's
// "<title of tutorial>" tutorial

#include <cs50.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>


// this method is for
// finding a specific file
void find()
{	
	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "r");

	if (fptr) 
	{
		printf("File exist.\n");
		fclose(fptr);
	}
	else
		printf("File not found.\n");
}

// this method is for
// creating a file
void create_file()
{	
	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "r");

	if (fptr)
		printf("File already exist.\n");
	else
	{
		fptr = fopen(fname, "w");
		printf("File successfully created.\n");
	}
	
	fclose(fptr);
}

// this method is for
// writing a character to a file
void write_character()
{
	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "a");

	if (fptr)
	{
		char chr;

		printf("Character: ");
		scanf("%c", &chr);
		fputc(chr, fptr);
		printf("%c is added to %s\n", chr, fname);
		fclose(fptr);
	}
	else
		printf("File not found.");
}

// this method is for
// getting a character from a file
void read_character()
{
	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "r");

	if (fptr)
	{	
		char chr;
		chr = fgetc( fptr);
		printf("Character: %c\n", chr);
		fclose(fptr);
	}
	else
		printf("File not found.");
}

// this method is for
// reading data from a file
void read_file()
{
	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "r");
	if (fptr)
	{	
		int length;
		printf("How many character you want to read? ");
		scanf("%i", &length);
		char* chrs = malloc(sizeof(char) * length);
		fread(chrs, sizeof(char), length, fptr);
		printf("Characters: %s\n", chrs);
		free(chrs);
		fclose(fptr);
	}
	else
		printf("File not found.");
}

// this method is for
// writing multiple character to a file
void write_to_file()
{
	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "a");
	if (fptr)
	{	
		int length;
		char* chrs = get_string("Enter characters: ");
		length = strlen(chrs);
		fwrite(chrs, sizeof(char), length, fptr);
		printf("Succesfully written to a file.\n");
		fclose(fptr);
	}
	else
		printf("File not found.");
}

// this method is for
// checking if the file exist
// if exist
//     return a FILE POINTER
// else
//     return false
// FILE fhfile_exist(char* fname, operation)
// {
// 	FILE* fptr = fopen(fname, operation);

// 	if (fptr)
// 		return fptr;
// 	else
// 		return false;
// }

// this method is for
// creating file
// this method is part of FILE HANDLING, (file_handling) method
int fhcreate_file()
{
	printf("Create Method Begin.\n");

	char* fname = get_string("File name: ");
	FILE* fptr = fopen(fname, "r");

	if (fptr)
	{
		printf("File already exist. Would you like to replace the file? ");
		char user_command;
		scanf("%c", &user_command);

		if (user_command == 'n')
			return 0;
			
	}

	fptr = fopen(fname, "w");
	printf("File successfully created.");

	fclose(fptr);

	printf("Create Method End.\n");
}

void fhwrite_file()
{
	printf("Write a file.\n");
}

void fhread_file()
{
	printf("Read a file.\n");
}

void fhupdate_file()
{
	printf("Update a file.\n");
}

void fhdelete_file()
{
	printf("Delete a file.\n");
}

// this method is for
// handling a file
// which include (Create, Read, Update, Delete) a file functionality
// methods with "fh" prefix is part of FILE HANDLING, (file_handling) method
void file_handling()
{
	char operation;
	bool continue_process = true;
	
	do
	{
		printf("[C for Create | W for Write | R for Read | U for Update | \
D for Delete | Exit]\nOperation: ");
		scanf("%c", &operation);

		if (operation >= 'A' && operation <= 'Z')
		{
			operation += 32;
		}

		switch (operation)
		{
			case 'c': fhcreate_file();
				break;
			case 'w': fhwrite_file();
				break;
			case 'r': fhread_file();
				break;
			case 'u': fhupdate_file();
				break;
			case 'd': fhdelete_file();
				break;
			case 'e': continue_process = false;
				      printf("Execution terminated. No errors occured.\n");
				break;
		}

		printf("\n");
	} while (continue_process);
}	

int main(void)
{
	// find begin
	// find();
	// find end

	// create_file begin
	// create_file();
	// create_file end

	// write_character begin
	// write_character();
	// write_character end

	// read_character begin
	// read_character();
	// read_character end

	// read_file begin
	// read_file();
	// read_file end

	// write_to_file begin
	// write_to_file();
	// write_to_file end

	// file handling begin
	file_handling();
	// file handling end

	return 0;
}