import sys

def main(total_sales, ticket_sold):
    adult_student = []

    for i in range(1, ticket_sold+1):
        for j in range(ticket_sold, 0, -1):
            if (i * 100 + j * 50) == total_sales:
                adult_student.append((i, j))

    return adult_student


if __name__ == '__main__':
    if len(sys.argv) == 3:
        for v in main(int(sys.argv[1]), int(sys.argv[2])):
            print(v)
        # output = main(int(sys.argv[1]), int(sys.argv[2]))
        # print(f'Input: ({sys.argv[1]}, {sys.argv[2]})')
        # print(f'Output: {output}')
    else:
        print('Missing Two Arguments')