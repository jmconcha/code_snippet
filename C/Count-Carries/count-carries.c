#include <cs50.h>
#include <stdio.h>
#include <string.h>

typedef struct {
    char* l;
    char* r;
    int carries;
}
pair_int;

int main(void)
{
    int pq = get_int("Enter Pair Quantity: ");
    pair_int pv[sizeof(pair_int) * pq];

    // printf("Enter Positive Integer: \n");
    for (int i = 0; i < pq; i++)
    {
        pv[i].l = get_string("l: ");
        pv[i].r = get_string("r: ");
        printf("\n");
    }

    return 0;
}