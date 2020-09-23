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

node* create(int number);
node* insert(node *head, int number);
void destroy(node *head);
void traverse(node *head);

int main(void)
{
	node *head = create(1);
    head = insert(head, 2);
    traverse(head);
    destroy(head);
    printf("\n");

	return 0;
}

node* create(int number)
{
    node *n = malloc(sizeof(node));

    if (!n)
    {
        return n;
    }

    n->number = number;
    n->next = NULL;

    return n;
}

node* insert(node *head, int number)
{
    node *n = create(number);

    if (!n)
    {
        return n;
    }

    n->next = head;
    return n;
}

void destroy(node *head)
{
    while (head)
    {
        node *next = head->next;
        free(head);
        head = next;
    }
}

void traverse(node *head)
{
    while (head)
    {
        printf("%i  ", head->number);
        head = head->next;
    }
}