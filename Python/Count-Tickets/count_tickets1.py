import sys

def main(total_sales, ticket_sold):
    for i in range(1, ticket_sold+1):
        if (i * 100) + (ticket_sold - i) * 50 == total_sales:
            return (i, ticket_sold - i)




if __name__ == '__main__':
    if len(sys.argv) == 3:
        print(main(int(sys.argv[1]), int(sys.argv[2])))

        # output = main(int(sys.argv[1]), int(sys.argv[2]))
        # print(f'Input: ({sys.argv[1]}, {sys.argv[2]})')
        # print(f'Output: {output}')
    else:
        print('Missing Two Arguments')